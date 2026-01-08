# Quick Start Guide - Supabase Integration

## ✅ Status: READY TO RUN

Semua error sudah diperbaiki. Script siap dijalankan!

## 🚀 Langkah Cepat (3 Menit)

### Step 1: Run SQL Script

1. Buka https://app.supabase.com
2. Login → Pilih project `yfisgogkoewxllkhupka`
3. Sidebar kiri → **SQL Editor**
4. Klik **New Query**
5. Copy SEMUA isi dari: `database/complete_integration.sql`
6. Paste ke SQL Editor
7. Klik **RUN** (atau Ctrl+Enter)

**✅ Tunggu sampai muncul "Success" atau hasil query verification**

### Step 2: Verify Installation

Setelah SQL berhasil, scroll ke bawah di hasil query. Anda akan melihat:

```
✅ Verification Results:

Tables Created:
- users, donations, communities, notifications, education_content, etc.

Views Created:
- vw_donation_offset_admin
- vw_communities_with_stats

Functions Created:
- get_dashboard_stats()
- get_emission_factors()
- get_education_content()
- ... dan 10+ lainnya
```

### Step 3: Test di Browser

1. Buka **Microsoft Edge**
2. Navigasi ke: `http://localhost:8000`
3. **Login** sebagai admin (jika belum)
4. Test halaman-halaman berikut:

```
✅ /dashboard-admin        → Harus ada statistik real
✅ /laporan-emisi          → Tabel donasi muncul
✅ /faktor-emisi           → Tabel emission factors
✅ /komunitas              → Cards komunitas dengan stats
✅ /edukasi                → Content cards (3 sample items)
✅ /notifikasi             → Daftar notifikasi
✅ /profile                → Admin profile
```

## ❓ Troubleshooting

### Error: "relation already exists"
✅ **Normal!** Abaikan. Script otomatis skip kalau sudah ada.

### Error: "permission denied"
❌ **Cek RLS policies**
```sql
SELECT * FROM pg_policies WHERE tablename = 'your_table_name';
```

### Halaman masih kosong setelah SQL run
✅ **Cek console (F12)**
- Lihat error apa yang muncul
- Biasanya: CORS, RLS, atau tabel belum dibuat

### Data tidak muncul
1. ✅ Refresh halaman (Ctrl+R)
2. ✅ Cek console untuk error
3. ✅ Verify SQL script sukses dijalankan

## 📊 Sample Data

Script otomatis insert 3 sample education content:
- ✅ "Tips Mengurangi Emisi Karbon"
- ✅ "Manfaat Offset Karbon"
- ✅ "Panduan Menggunakan EcoTrack"

Jika tabel `donations` dan `communities` sudah ada data, statistik akan langsung muncul!

## 🎯 Next Steps After Installation

### 1. Add Real Data
- Test form "Tambah Komunitas"
- Test form "Tambah Edukasi"
- Test form "Tambah Faktor Emisi"

### 2. Test CRUD Operations
- Create new community → Verify muncul di list
- Edit community → Verify perubahan tersimpan
- Delete (jika perlu)

### 3. Test File Upload
- Upload community image
- Upload education content image
- Verify muncul di storage bucket

## 📝 Files Reference

| File | Purpose |
|------|---------|
| `database/complete_integration.sql` | **Main SQL script** (jalankan ini!) |
| `resources/js/config/supabase.js` | Supabase client & helper functions |
| `BACKEND_INTEGRATION.md` | Integration guide (bonus) |
| `final_analysis.md` | Comprehensive analysis |

## ✨ What's Included

✅ **9 Tables** (education_content is NEW)  
✅ **2 Views** (with stats)  
✅ **13 RPC Functions** (for all pages)  
✅ **3 Storage Buckets** (avatars, education, community)  
✅ **RLS Policies** (security enabled)  
✅ **Sample Data** (3 education items)  
✅ **Error Handling** (all helper functions)  

## 🎉 Success Indicators

Setelah setup berhasil, Anda akan melihat:

1. ✅ **Dashboard Home** - Angka statistik real (bukan hardcoded)
2. ✅ **Donasi Offset** - Tabel dengan data dari database
3. ✅ **Komunitas** - Cards dengan member count & total donasi
4. ✅ **Edukasi** - 3 sample artikel muncul
5. ✅ **No errors** di console browser (F12)

---

**🚀 Ready? Jalankan sekarang!**

Jika ada error, screenshot dan beritahu saya. Good luck! 💪
