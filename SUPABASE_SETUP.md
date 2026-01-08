# Supabase Setup Guide for Offset Donations

This guide will help you set up the Supabase database for the Offset Donation Notes feature.

## Prerequisites

- Active Supabase account (sign up at https://supabase.com if you don't have one)
- Supabase project created
- Access to Supabase SQL Editor

## Step 1: Run the SQL Schema

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project: `yfisgogkoewxllkhupka`
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `database/supabase_schema.sql`
6. Paste it into the SQL editor
7. Click **Run** or press `Ctrl+Enter`

The script will:
- ✅ Create the `donasi_offset` table with all required columns
- ✅ Set up indexes for better query performance
- ✅ Enable Row Level Security (RLS)
- ✅ Create access policies for CRUD operations
- ✅ Insert sample data for testing
- ✅ Create a trigger for auto-updating timestamps

## Step 2: Verify the Setup

After running the SQL script, verify that everything is set up correctly:

### Check Table Structure

Run this query in the SQL Editor:
```sql
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'donasi_offset'
ORDER BY ordinal_position;
```

You should see 10 columns: id, nama_donor, jumlah_offset_ton, nominal_donasi, komunitas_tujuan, status, tanggal_donasi, catatan, created_at, updated_at

### Check Sample Data

Run this query:
```sql
SELECT * FROM public.donasi_offset ORDER BY tanggal_donasi DESC;
```

You should see 5 sample records.

### Check Statistics

Run this query:
```sql
SELECT 
    COUNT(*) as total_transaksi,
    SUM(nominal_donasi) as total_donasi,
    SUM(jumlah_offset_ton) as total_offset_ton,
    COUNT(DISTINCT komunitas_tujuan) as jumlah_komunitas
FROM public.donasi_offset;
```

Expected results:
- total_transaksi: 5
- total_donasi: 10,800,000
- total_offset_ton: 5.3
- jumlah_komunitas: 4

## Step 3: Test the Application

1. Make sure npm dev server is running:
   ```bash
   npm run dev
   ```

2. Navigate to the Offset Donation Notes page in your application

3. You should see:
   - ✅ Statistics cards showing total donations, total offset CO₂, and number of communities
   - ✅ Table displaying all 5 sample donation records
   - ✅ Filters working (search, status, date range)
   - ✅ No console errors related to Supabase

## Step 4: Add More Data (Optional)

To add more donation records, use the Supabase Table Editor:

1. Go to **Table Editor** in Supabase dashboard
2. Select `donasi_offset` table
3. Click **Insert row**
4. Fill in the required fields:
   - `nama_donor`: Name of the donor
   - `jumlah_offset_ton`: Amount of CO₂ offset in tons (e.g., 1.5)
   - `nominal_donasi`: Donation amount in IDR (e.g., 3000000)
   - `komunitas_tujuan`: Target community name
   - `status`: Choose from 'Sukses', 'Pending', or 'Gagal'
   - `tanggal_donasi`: Date of donation
   - `catatan`: Optional notes

## Troubleshooting

### Error: "relation 'donasi_offset' does not exist"
- Make sure you ran the SQL schema script completely
- Check that you're in the correct Supabase project

### Data not showing in the application
- Open browser DevTools (F12) and check the Console tab
- Look for any Supabase connection errors
- Verify your Supabase credentials in `resources/js/config/supabase.js`

### RLS Policy Issues
- Make sure RLS is enabled on the table
- Verify that all four policies (SELECT, INSERT, UPDATE, DELETE) are created
- Check policy details in Supabase → Authentication → Policies

## Table Schema Reference

```
donasi_offset
├── id (UUID, Primary Key)
├── nama_donor (TEXT, required)
├── jumlah_offset_ton (NUMERIC, required)
├── nominal_donasi (NUMERIC, required)
├── komunitas_tujuan (TEXT, required)
├── status (TEXT, required) - 'Sukses', 'Pending', or 'Gagal'
├── tanggal_donasi (TIMESTAMP, required)
├── catatan (TEXT, optional)
├── created_at (TIMESTAMP, auto)
└── updated_at (TIMESTAMP, auto)
```

## Next Steps

Once the setup is complete and verified:
1. The old `LaporanEmisi.jsx` file can be removed if desired
2. Consider setting up real-time subscriptions for live updates
3. Add data validation and error handling as needed
4. Implement export functionality (Excel/PDF)

## Support

If you encounter any issues:
- Check Supabase documentation: https://supabase.com/docs
- Review the error messages in browser console
- Verify API credentials are correct
