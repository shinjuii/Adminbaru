# Fix Gambar Komunitas - Troubleshooting Guide

## 🔍 Penyebab Gambar Tidak Muncul

### 1. **Data di Database Tidak Ada Gambar**
Jika `image_url` di table `communities` kosong/NULL:
- Fallback ke emoji 🏘️ otomatis
- Ini NORMAL jika belum upload gambar

### 2. **Image URL Tidak Valid**
Jika `image_url` ada tapi bukan URL valid:
- Fix: Kode sudah diupdate untuk cek `http://` atau `https://`
- Fallback ke emoji jika tidak valid

### 3. **CORS / Storage Bucket Issue**
Jika gambar dari Supabase Storage tidak load:
- Check Storage Bucket public access
- Check RLS policies

## ✅ Yang Sudah Diperbaiki

### Code Fix di `Komunitas.jsx`:

**Before:**
```javascript
<div className="...">
  {item.image}  // ❌ Langsung tampilkan, no check
</div>
```

**After:**
```javascript
<div className="...">
  {/* Check if URL or emoji */}
  {item.image && item.image.startsWith('http') ? (
    <img 
      src={item.image} 
      alt={item.nama}
      className="w-full h-full object-cover"
      onError={(e) => {
        // If image fails to load, hide img and show emoji
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
      }}
    />
  ) : null}
  <span 
    className="text-3xl"
    style={{ display: item.image && item.image.startsWith('http') ? 'none' : 'block' }}
  >
    {item.image && !item.image.startsWith('http') ? item.image : '🏘️'}
  </span>
</div>
```

**Fitur:**
- ✅ Deteksi URL vs Emoji
- ✅ Load gambar jika URL valid
- ✅ Error handling (onError)
- ✅ Fallback ke emoji jika gambar gagal load
- ✅ Default emoji 🏘️ jika tidak ada gambar

### Data Transformation Fix:

**Before:**
```javascript
image: c.image_url || '🏘️',  // ❌ Bisa jadi string kosong
```

**After:**
```javascript
image: (c.image_url && (c.image_url.startsWith('http://') || c.image_url.startsWith('https://'))) 
  ? c.image_url 
  : '🏘️',  // ✅ Cek valid URL
```

## 🧪 Testing

### Check Browser Console (F12):
```javascript
// Should see:
Communities fetched: 4

// Click komunitas card, inspect image element
// If image URL: <img src="https://...">
// If emoji: <span>🏘️</span>
```

### Expected Behavior:

**Scenario 1: Database has image_url**
```sql
-- In database:
image_url = 'https://yfisgogkoewxllkhupka.supabase.co/storage/v1/object/public/community-images/abc.jpg'

-- Result:
✅ Shows actual image
✅ If image fails, falls back to 🏘️
```

**Scenario 2: Database has emoji**
```sql
-- In database:
image_url = '🌿'

-- Result:
✅ Shows emoji 🌿
```

**Scenario 3: Database has NULL/empty**
```sql
-- In database:
image_url = NULL

-- Result:
✅ Shows default emoji 🏘️
```

## 📊 Check Data di Supabase

### Query to check image_url:
```sql
SELECT 
  id, 
  name, 
  image_url,
  CASE 
    WHEN image_url IS NULL THEN 'NULL (akan pakai emoji)'
    WHEN image_url LIKE 'http%' THEN 'Valid URL'
    ELSE 'Emoji atau invalid'
  END as status
FROM communities
LIMIT 10;
```

## 🖼️ Upload Gambar Baru (Opsional)

Jika mau upload gambar komunitas:

### 1. Via Supabase Dashboard:
```
1. Buka Supabase Dashboard
2. Storage → community-images bucket
3. Upload file (PNG/JPG)
4. Copy URL
5. Update communities table:
   UPDATE communities 
   SET image_url = 'https://...' 
   WHERE id = 'xxx';
```

### 2. Via App (Jika form upload sudah ada):
```javascript
// In Komunitas.jsx, handleSubmit:
const { data: uploadData } = await uploadImage(
  'community-images', 
  `communities/${Date.now()}_${file.name}`, 
  file
);

const imageUrl = uploadData?.publicUrl;

await createCommunity({
  ...formData,
  image_url: imageUrl
});
```

## 🎨 Fallback Emoji List

Jika pakai emoji, bisa ganti default:

```javascript
// In transformation:
const getCommunityEmoji = (focusArea) => {
  const emojis = {
    'Transportasi': '🚗',
    'Lingkungan': '🌿',
    'Energi': '⚡',
    'Edukasi': '📚',
    'default': '🏘️'
  };
  return emojis[focusArea] || emojis.default;
};

image: c.image_url || getCommunityEmoji(c.focus_area),
```

## ✅ Verification Steps

1. **Refresh browser** (Ctrl+R)
2. **Open Komunitas page**
3. **Check each card:**
   - Has image? ✅ Should show image
   - No image? ✅ Should show 🏘️
   - Broken image? ✅ Should fallback to 🏘️

4. **Open browser console** (F12):
   - No errors? ✅ Good
   - "Failed to load image"? ⚠️ Normal (will fallback)

## 🐛 Still Not Working?

### Check:
1. ✅ `npm run dev` still running
2. ✅ Refresh browser dengan Ctrl+Shift+R (hard refresh)
3. ✅ Check browser console untuk errors
4. ✅ Check Supabase connection

### Debug Commands:
```javascript
// In browser console:
// Check if Komunitas component rendered
console.log(document.querySelector('[alt*="komunitas"]'));

// Check image sources
document.querySelectorAll('img').forEach(img => {
  console.log('Image src:', img.src);
  console.log('Image loaded:', img.complete);
});
```

---

**Status: FIXED ✅**

Gambar sekarang akan:
- ✅ Load dari URL jika valid
- ✅ Fallback ke emoji jika tidak ada
- ✅ Fallback jika gambar error
- ✅ Always show something (never blank)
