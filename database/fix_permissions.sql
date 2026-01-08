-- FILE INI PENTING UNTUK MEMBUKA PERMISSION UPDATE --

-- 1. Reset Policies for Communities
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.communities;
DROP POLICY IF EXISTS "Enable read access for public" ON public.communities;
DROP POLICY IF EXISTS "Enable all access for anon" ON public.communities;

-- 2. Create permissive policies for Development (Allows Anon CRUD)
CREATE POLICY "Enable all access for anon" ON public.communities
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Reset Policies for Storage (Community Images)
DROP POLICY IF EXISTS "Community images public read" ON storage.objects;
DROP POLICY IF EXISTS "Community images authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Community images anon all" ON storage.objects;

-- 4. Create permissive policies for Storage
CREATE POLICY "Community images anon all" ON storage.objects
  FOR ALL 
  TO anon, authenticated
  USING (bucket_id = 'community-images')
  WITH CHECK (bucket_id = 'community-images');
