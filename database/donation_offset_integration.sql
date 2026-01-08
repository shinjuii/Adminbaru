-- =====================================================
-- DONATION OFFSET INTEGRATION FOR DASHBOARD ADMIN
-- =====================================================
-- Script ini mengintegrasikan halaman Catatan Donasi Offset
-- dengan database EcoTrack yang sudah ada
--
-- CARA PAKAI:
-- 1. Jalankan script ini di Supabase SQL Editor
-- 2. Refresh halaman /laporan-emisi di browser
-- 3. Data donasi akan muncul otomatis dari tabel donations
-- =====================================================

-- =====================================================
-- 1. CREATE VIEW untuk Dashboard Admin
-- =====================================================
-- View ini menggabungkan data donations dengan users dan communities
-- untuk ditampilkan di halaman Catatan Donasi Offset

CREATE OR REPLACE VIEW public.vw_donation_offset_admin AS
SELECT 
  d.id,
  u.full_name as nama_donor,
  d.carbon_amount as jumlah_offset_ton,
  d.amount as nominal_donasi,
  c.name as komunitas_tujuan,
  CASE 
    WHEN d.payment_status = 'success' THEN 'Sukses'
    WHEN d.payment_status = 'pending' THEN 'Pending'
    WHEN d.payment_status = 'failed' THEN 'Gagal'
    WHEN d.payment_status = 'cancelled' THEN 'Gagal'
    ELSE 'Pending'
  END as status,
  COALESCE(d.paid_at, d.donated_at) as tanggal_donasi,
  d.notes as catatan,
  d.created_at,
  d.updated_at
FROM public.donations d
JOIN public.users u ON d.user_id = u.user_id
JOIN public.communities c ON d.community_id = c.id
ORDER BY COALESCE(d.paid_at, d.donated_at) DESC;

-- Grant permissions
GRANT SELECT ON public.vw_donation_offset_admin TO authenticated;
GRANT SELECT ON public.vw_donation_offset_admin TO anon;

-- Add comment
COMMENT ON VIEW public.vw_donation_offset_admin IS 'View untuk Dashboard Admin - Catatan Donasi Offset dengan join ke users dan communities';

-- =====================================================
-- 2. CREATE RPC FUNCTION untuk Dashboard Stats
-- =====================================================
-- Function ini menghitung statistik untuk cards di halaman

CREATE OR REPLACE FUNCTION get_donation_offset_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_donasi NUMERIC;
  v_total_offset NUMERIC;
  v_jumlah_komunitas INT;
  v_jumlah_donor INT;
BEGIN
  -- Total Donasi (hanya yang sukses)
  SELECT COALESCE(SUM(amount), 0)
  INTO v_total_donasi
  FROM public.donations
  WHERE payment_status = 'success';
  
  -- Total Offset CO2 (hanya yang sukses)
  SELECT COALESCE(SUM(carbon_amount), 0)
  INTO v_total_offset
  FROM public.donations
  WHERE payment_status = 'success';
  
  -- Jumlah Komunitas yang pernah menerima donasi
  SELECT COUNT(DISTINCT community_id)
  INTO v_jumlah_komunitas
  FROM public.donations
  WHERE payment_status = 'success';
  
  -- Jumlah Donor unik
  SELECT COUNT(DISTINCT user_id)
  INTO v_jumlah_donor
  FROM public.donations
  WHERE payment_status = 'success';
  
  RETURN json_build_object(
    'total_donasi', v_total_donasi,
    'total_offset', v_total_offset,
    'jumlah_komunitas', v_jumlah_komunitas,
    'jumlah_donor', v_jumlah_donor
  );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_donation_offset_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_donation_offset_stats() TO anon;

-- =====================================================
-- 3. CREATE RPC FUNCTION untuk Top Donors
-- =====================================================

CREATE OR REPLACE FUNCTION get_top_donors_offset(p_limit INT DEFAULT 3)
RETURNS TABLE (
  nama_donor TEXT,
  total_offset NUMERIC,
  total_donasi NUMERIC,
  jumlah_transaksi BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.full_name as nama_donor,
    SUM(d.carbon_amount) as total_offset,
    SUM(d.amount) as total_donasi,
    COUNT(d.id) as jumlah_transaksi
  FROM public.donations d
  JOIN public.users u ON d.user_id = u.user_id
  WHERE d.payment_status = 'success'
  GROUP BY u.full_name
  ORDER BY SUM(d.carbon_amount) DESC
  LIMIT p_limit;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_top_donors_offset(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_top_donors_offset(INT) TO anon;

-- =====================================================
-- 4. CREATE RPC FUNCTION untuk Popular Communities
-- =====================================================

CREATE OR REPLACE FUNCTION get_popular_communities_offset(p_limit INT DEFAULT 3)
RETURNS TABLE (
  komunitas TEXT,
  total_donasi NUMERIC,
  total_offset NUMERIC,
  jumlah_donor BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.name as komunitas,
    SUM(d.amount) as total_donasi,
    SUM(d.carbon_amount) as total_offset,
    COUNT(DISTINCT d.user_id) as jumlah_donor
  FROM public.donations d
  JOIN public.communities c ON d.community_id = c.id
  WHERE d.payment_status = 'success'
  GROUP BY c.name
  ORDER BY SUM(d.amount) DESC
  LIMIT p_limit;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_popular_communities_offset(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_popular_communities_offset(INT) TO anon;

-- =====================================================
-- 5. UPDATE Supabase Client Configuration
-- =====================================================
-- Tidak perlu perubahan di supabase.js karena sudah benar

-- =====================================================
-- 6. VERIFICATION QUERIES
-- =====================================================

-- Test view
SELECT * FROM public.vw_donation_offset_admin LIMIT 5;

-- Test stats function
SELECT * FROM get_donation_offset_stats();

-- Test top donors
SELECT * FROM get_top_donors_offset(3);

-- Test popular communities
SELECT * FROM get_popular_communities_offset(3);

-- Check data count
SELECT 
  COUNT(*) as total_donations,
  COUNT(CASE WHEN payment_status = 'success' THEN 1 END) as sukses,
  COUNT(CASE WHEN payment_status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN payment_status IN ('failed', 'cancelled') THEN 1 END) as gagal
FROM public.donations;

-- =====================================================
-- INTEGRATION COMPLETE!
-- =====================================================
-- Sekarang Dashboard Admin bisa:
-- ✅ Membaca data dari tabel donations (via view)
-- ✅ Menampilkan statistik real-time
-- ✅ Menampilkan top donors
-- ✅ Menampilkan komunitas terpopuler
-- ✅ Filter berdasarkan status, tanggal, dll
-- =====================================================
