-- FIX PERMISSION FOR VEHICLE EMISSION FACTORS --

-- 1. Reset existing RLS
DROP POLICY IF EXISTS "Enable read access for all users" ON public.vehicle_emission_factors;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.vehicle_emission_factors;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.vehicle_emission_factors;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.vehicle_emission_factors;

-- 2. Create PERMISSIVE policies for Development
-- (Allows anyone including anon to Read, Create, Update, Delete)

CREATE POLICY "Enable all access for everyone" ON public.vehicle_emission_factors
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Verify RLS is enabled
ALTER TABLE public.vehicle_emission_factors ENABLE ROW LEVEL SECURITY;

-- 4. Grant privileges just in case
GRANT ALL ON public.vehicle_emission_factors TO anon;
GRANT ALL ON public.vehicle_emission_factors TO authenticated;
GRANT ALL ON public.vehicle_emission_factors TO service_role;
