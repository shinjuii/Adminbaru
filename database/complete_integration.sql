-- =====================================================
-- COMPLETE DASHBOARD ADMIN SUPABASE INTEGRATION
-- =====================================================
-- Script lengkap untuk mengintegrasikan semua halaman
-- Dashboard Admin dengan database Supabase EcoTrack
--
-- TABLES COVERED:
-- ✅ users, trip_history, donations, communities (sudah ada)
-- ✅ vehicle_emission_factors (sudah ada)
-- ✅ notifications (sudah ada)
-- ⚠️ education_content (perlu dibuat)
-- ⚠️ admin_activity_logs (sudah ada dari RLS script)
--
-- JALANKAN SCRIPT INI DI SUPABASE SQL EDITOR
-- =====================================================

-- =====================================================
-- 1. CREATE EDUCATION CONTENT TABLE (Untuk Halaman Edukasi)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.education_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('tips', 'artikel', 'panduan', 'berita')),
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  views_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_education_category ON public.education_content(category);
CREATE INDEX IF NOT EXISTS idx_education_published ON public.education_content(is_published) WHERE is_published = TRUE;
CREATE INDEX IF NOT EXISTS idx_education_featured ON public.education_content(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_education_created ON public.education_content(created_at DESC);

-- RLS
ALTER TABLE public.education_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "education_public_read" ON public.education_content;
DROP POLICY IF EXISTS "education_admin_all" ON public.education_content;

-- Public can read published content
CREATE POLICY "education_public_read" ON public.education_content
  FOR SELECT USING (is_published = TRUE);

-- Authenticated users (admin) can do everything
CREATE POLICY "education_admin_all" ON public.education_content
  FOR ALL TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- Trigger
DROP TRIGGER IF EXISTS update_education_updated_at ON public.education_content;
CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON public.education_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE public.education_content IS 'Educational content for Halaman Edukasi';

-- =====================================================
-- 2. DASHBOARD HOME - STATISTICS FUNCTIONS
-- =====================================================

-- Main dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_stats JSON;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.users WHERE role = 'user'),
    'total_communities', (SELECT COUNT(*) FROM public.communities WHERE is_active = TRUE),
    'total_trips', (SELECT COUNT(*) FROM public.trip_history),
    'total_donations', (SELECT COUNT(*) FROM public.donations WHERE payment_status = 'success'),
    'total_donation_amount', (SELECT COALESCE(SUM(amount), 0) FROM public.donations WHERE payment_status = 'success'),
    'total_emissions', (SELECT COALESCE(SUM(COALESCE(co2_emission, emission)), 0) FROM public.trip_history),
    'total_emissions_offset', (SELECT COALESCE(SUM(carbon_amount), 0) FROM public.donations WHERE payment_status = 'success'),
    'recent_users', (SELECT COUNT(*) FROM public.users WHERE created_at > NOW() - INTERVAL '30 days'),
    'recent_donations', (SELECT COUNT(*) FROM public.donations WHERE created_at > NOW() - INTERVAL '30 days'),
    'pending_donations', (SELECT COUNT(*) FROM public.donations WHERE payment_status = 'pending')
  ) INTO v_stats;
  
  RETURN v_stats;
END;
$$;

GRANT EXECUTE ON FUNCTION get_dashboard_stats() TO authenticated, anon;

-- Recent activities
CREATE OR REPLACE FUNCTION get_recent_activities(p_limit INT DEFAULT 10)
RETURNS TABLE (
  id UUID,
  type TEXT,
  user_name TEXT,
  amount NUMERIC,
  community_name TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    'donation'::TEXT as type,
    u.full_name as user_name,
    d.amount,
    c.name as community_name,
    d.created_at
  FROM public.donations d
  JOIN public.users u ON d.user_id = u.user_id
  JOIN public.communities c ON d.community_id = c.id
  WHERE d.payment_status = 'success'
  ORDER BY d.created_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION get_recent_activities(INT) TO authenticated, anon;

-- Monthly donation trends
CREATE OR REPLACE FUNCTION get_monthly_donation_trends(p_months INT DEFAULT 6)
RETURNS TABLE (
  month TEXT,
  total_amount NUMERIC,
  donation_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') as month,
    SUM(amount) as total_amount,
    COUNT(*) as donation_count
  FROM public.donations
  WHERE payment_status = 'success'
    AND created_at >= NOW() - (p_months || ' months')::INTERVAL
  GROUP BY DATE_TRUNC('month', created_at)
  ORDER BY DATE_TRUNC('month', created_at) DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_monthly_donation_trends(INT) TO authenticated, anon;

-- =====================================================
-- 3. FAKTOR EMISI - CRUD FUNCTIONS
-- =====================================================

-- Get all emission factors
CREATE OR REPLACE FUNCTION get_emission_factors()
RETURNS TABLE (
  id UUID,
  vehicle_type TEXT,
  fuel_type TEXT,
  cc_min INTEGER,
  cc_max INTEGER,
  emission_factor_min NUMERIC,
  emission_factor_max NUMERIC,
  emission_factor_avg NUMERIC,
  description TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    vef.id,
    vef.vehicle_type,
    vef.fuel_type,
    vef.cc_min,
    vef.cc_max,
    vef.emission_factor_min,
    vef.emission_factor_max,
    vef.emission_factor_avg,
    vef.description,
    vef.created_at
  FROM public.vehicle_emission_factors vef
  ORDER BY vef.vehicle_type, vef.cc_min;
END;
$$;

GRANT EXECUTE ON FUNCTION get_emission_factors() TO authenticated, anon;

-- =====================================================
-- 4. KOMUNITAS - VIEW & FUNCTIONS
-- =====================================================

-- Enhanced communities view with stats
CREATE OR REPLACE VIEW public.vw_communities_with_stats AS
SELECT 
  c.id,
  c.name,
  c.description,
  c.image_url,
  c.location,
  c.focus_area,
  c.carbon_price_per_kg,
  c.is_active,
  c.created_at,
  c.updated_at,
  COUNT(DISTINCT d.user_id) as member_count,
  COALESCE(SUM(d.amount), 0) as total_received,
  COALESCE(SUM(d.carbon_amount), 0) as total_carbon_offset,
  COUNT(d.id) as donation_count
FROM public.communities c
LEFT JOIN public.donations d ON c.id = d.community_id AND d.payment_status = 'success'
GROUP BY c.id, c.name, c.description, c.image_url, c.location, c.focus_area, 
         c.carbon_price_per_kg, c.is_active, c.created_at, c.updated_at
ORDER BY c.created_at DESC;

GRANT SELECT ON public.vw_communities_with_stats TO authenticated, anon;

-- =====================================================
-- 5. EDUKASI - CRUD FUNCTIONS
-- =====================================================

-- Get published education content
CREATE OR REPLACE FUNCTION get_education_content(
  p_category TEXT DEFAULT NULL,
  p_limit INT DEFAULT 20,
  p_offset INT DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  views_count INTEGER,
  is_featured BOOLEAN,
  tags TEXT[],
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ec.id,
    ec.title,
    ec.description,
    ec.content,
    ec.category,
    ec.image_url,
    ec.views_count,
    ec.is_featured,
    ec.tags,
    ec.created_at
  FROM public.education_content ec
  WHERE ec.is_published = TRUE
    AND (p_category IS NULL OR ec.category = p_category)
  ORDER BY ec.is_featured DESC, ec.created_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$;

GRANT EXECUTE ON FUNCTION get_education_content(TEXT, INT, INT) TO authenticated, anon;

-- Increment view count
CREATE OR REPLACE FUNCTION increment_education_views(p_content_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.education_content
  SET views_count = views_count + 1
  WHERE id = p_content_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_education_views(UUID) TO authenticated, anon;

-- =====================================================
-- 6. NOTIFIKASI - ENHANCED FUNCTIONS
-- =====================================================

-- Get unread notification count
CREATE OR REPLACE FUNCTION get_unread_notification_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.notifications
    WHERE user_id = auth.uid() AND is_read = FALSE
  );
END;
$$;

GRANT EXECUTE ON FUNCTION get_unread_notification_count() TO authenticated;

-- Mark notification as read
CREATE OR REPLACE FUNCTION mark_notification_read(p_notification_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.notifications
  SET is_read = TRUE
  WHERE id = p_notification_id AND user_id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION mark_notification_read(UUID) TO authenticated;

-- Mark all as read
CREATE OR REPLACE FUNCTION mark_all_notifications_read()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.notifications
  SET is_read = TRUE
  WHERE user_id = auth.uid() AND is_read = FALSE;
END;
$$;

GRANT EXECUTE ON FUNCTION mark_all_notifications_read() TO authenticated;

-- =====================================================
-- 7. PROFILE ADMIN - FUNCTIONS
-- =====================================================

-- Get admin profile with stats
CREATE OR REPLACE FUNCTION get_admin_profile()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_profile JSON;
  v_user_id UUID := auth.uid();
BEGIN
  SELECT json_build_object(
    'user_id', u.user_id,
    'email', u.email,
    'full_name', u.full_name,
    'role', u.role,
    'profile_photo_url', u.profile_photo_url,
    'city', u.city,
    'province', u.province,
    'last_login_at', u.last_login_at,
    'login_count', u.login_count,
    'created_at', u.created_at,
    'admin_profile', (
      SELECT json_build_object(
        'department', ap.department,
        'permissions', ap.permissions
      )
      FROM public.admin_profiles ap
      WHERE ap.user_id = u.user_id
    )
  ) INTO v_profile
  FROM public.users u
  WHERE u.user_id = v_user_id;
  
  RETURN v_profile;
END;
$$;

GRANT EXECUTE ON FUNCTION get_admin_profile() TO authenticated;

-- =====================================================
-- 8. STORAGE BUCKET FOR IMAGES
-- =====================================================

-- Create buckets if not exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('education-images', 'education-images', true),
  ('community-images', 'community-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for education-images
DROP POLICY IF EXISTS "Education images public read" ON storage.objects;
DROP POLICY IF EXISTS "Education images authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Education images authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Education images authenticated delete" ON storage.objects;

CREATE POLICY "Education images public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'education-images');

CREATE POLICY "Education images authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'education-images');

CREATE POLICY "Education images authenticated update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'education-images');

CREATE POLICY "Education images authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'education-images');

-- RLS Policies for community-images
DROP POLICY IF EXISTS "Community images public read" ON storage.objects;
DROP POLICY IF EXISTS "Community images authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Community images authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Community images authenticated delete" ON storage.objects;

CREATE POLICY "Community images public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'community-images');

CREATE POLICY "Community images authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'community-images');

CREATE POLICY "Community images authenticated update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'community-images');

CREATE POLICY "Community images authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'community-images');

-- =====================================================
-- 9. INSERT SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Sample education content
INSERT INTO public.education_content (title, description, content, category, is_featured, tags)
VALUES
  (
    'Tips Mengurangi Emisi Karbon', 
    'Panduan praktis untuk mengurangi jejak karbon dalam kehidupan sehari-hari',
    'Berikut adalah beberapa tips praktis untuk mengurangi emisi karbon...',
    'tips',
    TRUE,
    ARRAY['karbon', 'lingkungan', 'tips']
  ),
  (
    'Manfaat Offset Karbon',
    'Memahami pentingnya program offset karbon untuk masa depan',
    'Offset karbon adalah cara efektif untuk mengkompensasi emisi...',
    'artikel',
    TRUE,
    ARRAY['offset', 'karbon', 'edukasi']
  ),
  (
    'Panduan Menggunakan EcoTrack',
    'Langkah-langkah menggunakan aplikasi EcoTrack',
    'EcoTrack membantu Anda melacak dan mengurangi jejak karbon...',
    'panduan',
    FALSE,
    ARRAY['tutorial', 'aplikasi']
  )
ON CONFLICT DO NOTHING;

-- =====================================================
-- 10. VERIFICATION QUERIES
-- =====================================================

-- Check all tables
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN (
    'users', 'trip_history', 'donations', 'communities',
    'vehicle_emission_factors', 'notifications', 'education_content',
    'admin_profiles', 'admin_activity_logs'
  )
ORDER BY table_name;

-- Check all views
SELECT 
  table_name as view_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name LIKE 'vw_%'
ORDER BY table_name;

-- Check all functions
SELECT 
  routine_name as function_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE 'get_%'
ORDER BY routine_name;

-- Test main dashboard stats
SELECT * FROM get_dashboard_stats();

-- Test education content
SELECT * FROM get_education_content(NULL, 5, 0);

-- Test communities with stats
SELECT * FROM public.vw_communities_with_stats LIMIT 5;

-- Test emission factors
SELECT * FROM get_emission_factors() LIMIT 5;

-- =====================================================
-- INTEGRATION COMPLETE!
-- =====================================================
-- Summary:
-- ✅ Dashboard Home - Statistics & trends
-- ✅ Faktor Emisi - CRUD operations
-- ✅ Komunitas - View with stats
-- ✅ Edukasi - Content management
-- ✅ Notifikasi - Read/unread management
-- ✅ Donasi Offset - Already integrated
-- ✅ Profile Admin - Profile with stats
-- ✅ Storage Buckets - Image uploads
-- ✅ Sample Data - For testing
-- =====================================================
