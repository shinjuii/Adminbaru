-- ===================================================
-- SUPABASE DATABASE SCHEMA FOR DONASI OFFSET
-- ===================================================
-- This SQL script creates the table structure for offset donations
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Create the donasi_offset table
CREATE TABLE IF NOT EXISTS public.donasi_offset (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_donor TEXT NOT NULL,
    jumlah_offset_ton NUMERIC(10, 2) NOT NULL DEFAULT 0,
    nominal_donasi NUMERIC(15, 0) NOT NULL DEFAULT 0,
    komunitas_tujuan TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Sukses', 'Pending', 'Gagal')),
    tanggal_donasi TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    catatan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_donasi_offset_tanggal ON public.donasi_offset(tanggal_donasi DESC);
CREATE INDEX IF NOT EXISTS idx_donasi_offset_status ON public.donasi_offset(status);
CREATE INDEX IF NOT EXISTS idx_donasi_offset_komunitas ON public.donasi_offset(komunitas_tujuan);

-- Enable Row Level Security (RLS)
ALTER TABLE public.donasi_offset ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for all authenticated users
CREATE POLICY "Allow read access for all users" ON public.donasi_offset
    FOR SELECT
    USING (true);

-- Create policy to allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON public.donasi_offset
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow update for authenticated users
CREATE POLICY "Allow update for authenticated users" ON public.donasi_offset
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Create policy to allow delete for authenticated users
CREATE POLICY "Allow delete for authenticated users" ON public.donasi_offset
    FOR DELETE
    USING (true);

-- ===================================================
-- INSERT SAMPLE DATA (OPTIONAL)
-- ===================================================
-- Insert some sample donation records for testing

INSERT INTO public.donasi_offset (nama_donor, jumlah_offset_ton, nominal_donasi, komunitas_tujuan, status, tanggal_donasi, catatan)
VALUES
    ('Andi', 2.5, 5000000, 'Komunitas 1', 'Sukses', '2025-09-26', 'Donasi offset untuk program penanaman pohon'),
    ('Budi', 1.0, 2000000, 'Komunitas 5', 'Sukses', '2025-09-21', 'Donasi offset karbon bulanan'),
    ('Citra', 0.5, 500000, 'Komunitas 3', 'Sukses', '2025-09-15', 'Kontribusi offset CO2'),
    ('Dewi', 0.3, 300000, 'Komunitas 12', 'Pending', '2025-09-10', 'Menunggu konfirmasi'),
    ('Eko', 1.5, 3000000, 'Komunitas 1', 'Sukses', '2025-09-05', 'Program offset tahunan');

-- ===================================================
-- CREATE FUNCTION FOR AUTO-UPDATING updated_at
-- ===================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_donasi_offset_updated_at
    BEFORE UPDATE ON public.donasi_offset
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================================
-- VERIFICATION QUERIES
-- ===================================================
-- Run these queries to verify the setup

-- Check if table was created successfully
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'donasi_offset'
ORDER BY ordinal_position;

-- Count total records
SELECT COUNT(*) as total_records FROM public.donasi_offset;

-- View all donation records
SELECT * FROM public.donasi_offset ORDER BY tanggal_donasi DESC;

-- Get statistics
SELECT 
    COUNT(*) as total_transaksi,
    SUM(nominal_donasi) as total_donasi,
    SUM(jumlah_offset_ton) as total_offset_ton,
    COUNT(DISTINCT komunitas_tujuan) as jumlah_komunitas
FROM public.donasi_offset;
