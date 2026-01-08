# INTEGRASI LENGKAP - Panduan Install Supabase ke Semua Halaman

## 🚀 STATUS FINAL

### ✅ **Yang Sudah Selesai:**
1. **DashboardHome.jsx** - Full integration dengan Supabase
2. **CatatanDonasiOffset.jsx** - Full integration dengan Supabase  
3. **complete_integration.sql** - Database schema ready
4. **supabase.js** - All helper functions ready

### 🔧 **Yang Perlu Diupdate (Manual - Ikuti Template):**
5. Komunitas.jsx
6. FaktorEmisi.jsx
7. Edukasi.jsx
8. Notifikasi.jsx

---

## 📋 STEP-BY-STEP INSTALLATION

### ⚙️ LANGKAH 1: Run SQL Script (PENTING!)

```bash
# Buka https://app.supabase.com
# Login → Project → SQL Editor
# Copy paste isi file:
database/complete_integration.sql

# Klik RUN
```

**Verification:**
```sql
-- Check if functions created:
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE 'get_%';

-- Should return:
-- get_dashboard_stats
-- get_recent_activities
-- get_monthly_donation_trends
-- get_emission_factors
-- get_education_content
-- get_admin_profile
-- ... dan lainnya
```

---

### 🏗️ LANGKAH 2: Update Setiap Halaman

#### A. **Komunitas.jsx** - Template Integration

**Tamb bahkan di line 1-4:**
```javascript
import React, { useState, useEffect } from "react";  // Tambah useEffect
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiMapPin, FiCalendar, FiSearch, FiX, FiUpload, FiMail, FiPhone, FiGlobe, FiClock, FiTrendingUp } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { getCommunitiesWithStats, createCommunity, updateCommunity, deleteCommunity, uploadImage } from "../../../config/supabase";  // TAMBAH INI
```

**Replace line 14-67 (hardcoded communities) dengan:**
```javascript
// State untuk Supabase data
const [communities, setCommunities] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Fetch dari Supabase saat component load  
useEffect(() => {
  fetchCommunities();
}, []);

const fetchCommunities = async () => {
  try {
    setLoading(true);
    const { data, error } = await getCommunitiesWithStats();
    if (error) throw new Error(error);
    
    // Transform data untuk matching dengan UI
    const transformed = data.map(c => ({
      id: c.id,
      nama: c.name,
      lokasi: c.location,
      deskripsi: c.description,
      kontak: c.contact_email || 'N/A',
      phone: c.contact_phone || 'N/A',
      website: c.website || 'N/A',
      tanggal: new Date(c.created_at).toLocaleDateString('id-ID'),
      status: c.is_active ? 'aktif' : 'nonaktif',
      kategori: c.focus_area || 'Umum',
      image: c.image_url || '🏘️',
      // Stats dari view
      member_count: c.member_count || 0,
      total_received: c.total_received || 0,
      total_carbon_offset: c.total_carbon_offset || 0
    }));
    
    setCommunities(transformed);
  } catch (err) {
    console.error('Error fetching communities:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

**Update Stats Cards (line 124-177):**
```javascript
{/* Total Komunitas - REAL dari database */}
<div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
  <div className="flex items-center gap-4">
    <div className="p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg"
         style={{ background: 'linear-gradient(to bottom right, #3E5F44, #6C8C73)' }}>
      <FiUsers size={28} />
    </div>
    <div className="flex-1">
      <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Komunitas</p>
      <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>
        {loading ? '...' : communities.length}
      </p>
      <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Aktif</p>
    </div>
  </div>
</div>

{/* Total Members */}
<div className="...">
  <p className="text-3xl font-bold mt-1">
    {loading ? '...' : communities.reduce((sum, c) => sum + (c.member_count || 0), 0)}
  </p>
</div>

{/* Total Donations */}
<div className="...">
  <p className="text-3xl font-bold mt-1">
    {loading ? '...' : `Rp ${communities.reduce((sum, c) => sum + (c.total_received || 0), 0).toLocaleString('id-ID')}`}
  </p>
</div>
```

**Add Loading State (before return):**
```javascript
if (loading) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 ml-[90px] lg:ml-[290px] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
               style={{ borderColor: '#3E5F44' }}></div>
          <p style={{ color: '#5C6D5D' }}>Loading communities...</p>
        </div>
      </div>
    </div>
  );
}
```

---

#### B. **FaktorEmisi.jsx** - Template Integration

**Add to imports:**
```javascript
import { useState, useEffect } from "react";  // Tambah useEffect
import { getEmissionFactors, createEmissionFactor, updateEmissionFactor, deleteEmissionFactor } from "../../../config/supabase";
```

**Replace hardcoded data dengan:**
```javascript
const [factors, setFactors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchFactors();
}, []);

const fetchFactors = async () => {
  try {
    setLoading(true);
    const { data, error } = await getEmissionFactors();
    if (error) throw new Error(error);
    
    // Transform untuk UI
    const transformed = data.map(f => ({
      id: f.id,
      jenisKendaraan: f.vehicle_type,
      bahanBakar: f.fuel_type,
      ccMin: f.cc_min,
      ccMax: f.cc_max,
      faktorEmisi: f.emission_factor_avg,
      deskripsi: f.description,
      tanggal: new Date(f.created_at).toLocaleDateString('id-ID')
    }));
    
    setFactors(transformed);
  } catch (err) {
    console.error('Error:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

#### C. **Edukasi.jsx** - Template Integration

**Add to imports:**
```javascript
import { useState, useEffect } from "react";
import { getEducationContent, createEducationContent, updateEducationContent, deleteEducationContent, uploadImage } from "../../../config/supabase";
```

**Replace data:**
```javascript
const [contents, setContents] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedCategory, setSelectedCategory] = useState(null);

useEffect(() => {
  fetchContents();
}, [selectedCategory]);

const fetchContents = async () => {
  try {
    setLoading(true);
    const { data, error } = await getEducationContent(selectedCategory, 20, 0);
    if (error) throw new Error(error);
    
    const transformed = data.map(c => ({
      id: c.id,
      judul: c.title,
      deskripsi: c.description,
      konten: c.content,
      kategori: c.category,
      image: c.image_url || '📚',
      views: c.views_count,
      featured: c.is_featured,
      tags: c.tags || [],
      tanggal: new Date(c.created_at).toLocaleDateString('id-ID')
    }));
    
    setContents(transformed);
  } finally {
    setLoading(false);
  }
};
```

---

#### D. **Notifikasi.jsx** - Template Integration

**Add to imports:**
```javascript
import { useState, useEffect } from "react";
import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from "../../../config/supabase";
```

**Replace data:**
```javascript
const [notifications, setNotifications] = useState([]);
const [loading, setLoading] = useState(true);
const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  fetchNotifications();
  fetchUnreadCount();
}, []);

const fetchNotifications = async () => {
  try {
    setLoading(true);
    const { data, error } = await getNotifications();
    if (error) throw new Error(error);
    
    const transformed = data.map(n => ({
      id: n.id,
      judul: n.title,
      pesan: n.message,
      tipe: n.type,
      status: n.is_read ? 'dibaca' : 'belum dibaca',
      tanggal: new Date(n.created_at).toLocaleDateString('id-ID'),
      waktu: new Date(n.created_at).toLocaleTimeString('id-ID')
    }));
    
    setNotifications(transformed);
  } finally {
    setLoading(false);
  }
};

const fetchUnreadCount = async () => {
  const { data } = await getUnreadCount();
  setUnreadCount(data || 0);
};

const handleMarkAsRead = async (id) => {
  await markAsRead(id);
  fetchNotifications();
  fetchUnreadCount();
};
```

---

## ✅ VERIFICATION CHECKLIST

### Database Side:
- [ ] SQL script berhasil dijalankan di Supabase
- [ ] Functions exist: `SELECT * FROM pg_proc WHERE proname LIKE 'get_%'`
- [ ] Views exist: `SELECT * FROM pg_views WHERE viewname LIKE 'vw_%'`
- [ ] Tables have data

### Frontend Side:
- [ ] `DashboardHome.jsx` shows real stats (not 0)
- [ ] `CatatanDonasiOffset.jsx` shows donation table
- [ ] `Komunitas.jsx` shows communities from database
- [ ] `FaktorEmisi.jsx` shows emission factors
- [ ] `Edukasi.jsx` shows education content
- [ ] No console errors in browser (F12)

---

## 🎯 EXPECTED RESULTS

### Dashboard Home:
```
Total User: 156          ← Real dari database
Total Emisi: 2,543 ton   ← Sum dari trip_history
Total Donasi: Rp 45 juta ← Sum dari donations  
Komunitas: 8             ← Count dari communities
```

### Komunitas:
```
Card 1: Komunitas Hijau Jakarta
- Members: 45
- Total Received: Rp 2,500,000
- Carbon Offset: 15.2 ton

Card 2: ... (dari database)
```

### Faktor Emisi:
```
Row 1: Mobil | Bensin | 1000-1500cc | 0.195 kg/km
Row 2: Motor | Bensin | 110-150cc | 0.072 kg/km
... (dari database)
```

### Edukasi:
```
Card 1: Tips Mengurangi Emisi Karbon
- Category: tips
- Views: 1,234
- Featured: ⭐
... (dari database)
```

---

## 🐛 TROUBLESHOOTING

### Problem: Data masih 0 atau kosong
**Solution:**
1. Check apakah SQL script sudah dijalankan
2. Check apakah ada data di table: `SELECT COUNT(*) FROM communities;`
3. Check RLS policies: Temporarily disable untuk test
4. Check browser console (F12) untuk error

### Problem: "Function does not exist"
**Solution:**
```sql
-- Re-run the complete_integration.sql
-- Or manually check:
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public';
```

### Problem: Permission denied (RLS)
**Solution:**
```sql
-- Check policies:
SELECT * FROM pg_policies WHERE tablename = 'communities';

-- Grant permissions:
GRANT ALL ON communities TO anon, authenticated;
```

---

## 📝 FINAL NOTES

**Setelah semua halaman diupdate:**

1. ✅ Test login flow
2. ✅ Navigate ke setiap halaman
3. ✅ Verify data muncul
4. ✅ Test CRUD operations (Create Read Update Delete)
5. ✅ Test filter & search
6. ✅ Check performance (loading time)

**Files Modified:**
- ✅ `DashboardHome.jsx` - DONE
- ✅ `CatatanDonasiOffset.jsx` - DONE
- 🔧 `Komunitas.jsx` - Follow template above
- 🔧 `FaktorEmisi.jsx` - Follow template above
- 🔧 `Edukasi.jsx` - Follow template above
- 🔧 `Notifikasi.jsx` - Follow template above

**Database:**
- ✅ `complete_integration.sql` - RUN THIS FIRST!

---

## 🚀 Quick Start Command:

```bash
# 1. Make sure npm run dev is running
# Already running: ✅

# 2. Run SQL in Supabase
# Manual: Copy database/complete_integration.sql → Supabase SQL Editor

# 3. Test pages one by one
# Open browser: http://localhost:8000
# Login → Dashboard → Check each page
```

**Status: READY FOR IMPLEMENTATION!** 🎯

Semua code sudah ada, tinggal apply template di atas ke setiap file!
