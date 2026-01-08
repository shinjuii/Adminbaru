# COMPLETE INTEGRATION GUIDE - All Admin Pages

## ✅ Pages Integration Status

### 1. Dashboard Home (`DashboardHome.jsx`) - ✅ UPDATED
**What Changed:**
- Added `getDashboardStats()`, `getRecentActivities()`, `getMonthlyTrends()` 
- Real stats: total_users, total_communities, total_trips, total_donations
- Refresh button now refetches data
- Loading states implemented

**Display:**
- Total User → `stats.total_users`
- Total Emisi → `stats.total_emissions`  
- Total Donasi → `stats.total_donation_amount` (formatted as Rupiah)
- Jumlah Komunitas → `stats.total_communities`

---

### 2. Catatan Donasi Offset (`CatatanDonasiOffset.jsx`) - ✅ COMPLETE
**Already integrated!** Uses `vw_donation_offset_admin` view.

---

### 3. Faktor Emisi (`FaktorEmisi.jsx`) - 🔧 NEEDS UPDATE

**Quick Integration:**
```javascript
import { getEmissionFactors, createEmissionFactor, updateEmissionFactor, deleteEmissionFactor } from '../../../config/supabase';

// In component:
const [factors, setFactors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchFactors();
}, []);

const fetchFactors = async () => {
  const { data, error } = await getEmissionFactors();
  if (data) setFactors(data);
  setLoading(false);
};

// For table display:
{factors.map(factor => (
  <tr key={factor.id}>
    <td>{factor.vehicle_type}</td>
    <td>{factor.fuel_type}</td>
    <td>{factor.cc_min} - {factor.cc_max}</td>
    <td>{factor.emission_factor_avg}</td>
    <td>{factor.description}</td>
  </tr>
))}
```

---

### 4. Komunitas (`Komunitas.jsx`) - 🔧 NEEDS UPDATE

**Quick Integration:**
```javascript
import { getCommunitiesWithStats, createCommunity, updateCommunity, deleteCommunity, uploadImage } from '../../../config/supabase';

// In component:
const [communities, setCommunities] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchCommunities();
}, []);

const fetchCommunities = async () => {
  const { data, error } = await getCommunitiesWithStats();
  if (data) setCommunities(data);
  setLoading(false);
};

// For card display:
{communities.map(community => (
  <div key={community.id} className="community-card">
    <img src={community.image_url} alt={community.name} />
    <h3>{community.name}</h3>
    <p>{community.description}</p>
    <p>Location: {community.location}</p>
    <p>Members: {community.member_count}</p>
    <p>Total Received: Rp {community.total_received.toLocaleString()}</p>
    <p>Carbon Offset: {community.total_carbon_offset} ton</p>
  </div>
))}
```

**Image Upload:**
```javascript
const handleImageUpload = async (file) => {
  const path = `communities/${Date.now()}_${file.name}`;
  const { data, error } = await uploadImage('community-images', path, file);
  if (data) {
    return data.publicUrl; // Use this as image_url when creating/updating community
  }
};
```

---

### 5. Edukasi (`Edukasi.jsx`) - 🔧 NEEDS UPDATE

**Quick Integration:**
```javascript
import { getEducationContent, createEducationContent, updateEducationContent, deleteEducationContent, uploadImage } from '../../../config/supabase';

// In component:
const [contents, setContents] = useState([]);
const [category, setCategory] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchContents();
}, [category]);

const fetchContents = async () => {
  const { data, error } = await getEducationContent(category, 20, 0);
  if (data) setContents(data);
  setLoading(false);
};

// For card display:
{contents.map(content => (
  <div key={content.id} className="content-card">
    <img src={content.image_url} alt={content.title} />
    <span className="badge">{content.category}</span>
    {content.is_featured && <span className="featured">⭐ Featured</span>}
    <h3>{content.title}</h3>
    <p>{content.description}</p>
    <div className="meta">
      <span>👁️ {content.views_count} views</span>
      <span>📅 {new Date(content.created_at).toLocaleDateString()}</span>
    </div>
    <div className="tags">
      {content.tags && content.tags.map(tag => (
        <span key={tag} className="tag">#{tag}</span>
      ))}
    </div>
  </div>
))}

// Category filter:
<select value={category} onChange={(e) => setCategory(e.target.value || null)}>
  <option value="">All Categories</option>
  <option value="tips">Tips</option>
  <option value="artikel">Artikel</option>
  <option value="panduan">Panduan</option>
  <option value="berita">Berita</option>
</select>
```

**Creating Content:**
```javascript
const handleCreateContent = async (formData) => {
  // Upload image first if provided
  let imageUrl = null;
  if (formData.image) {
    const path = `education/${Date.now()}_${formData.image.name}`;
    const { data } = await uploadImage('education-images', path, formData.image);
    imageUrl = data?.publicUrl;
  }

  // Create content
  const { data, error } = await createEducationContent({
    title: formData.title,
    description: formData.description,
    content: formData.content,
    category: formData.category,
    image_url: imageUrl,
    is_published: formData.is_published || true,
    is_featured: formData.is_featured || false,
    tags: formData.tags || []
  });

  if (data) {
    fetchContents(); // Refresh list
  }
};
```

---

### 6. Notifikasi (`Notifikasi.jsx`) - 🔧 NEEDS UPDATE

**Quick Integration:**
```javascript
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../../../config/supabase';

// In component:
const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchNotifications();
  fetchUnreadCount();
}, []);

const fetchNotifications = async () => {
  const { data, error } = await getNotifications();
  if (data) setNotifications(data);
  setLoading(false);
};

const fetchUnreadCount = async () => {
  const { data, error } = await getUnreadCount();
  if (data !== null) setUnreadCount(data);
};

const handleMarkAsRead = async (id) => {
  await markAsRead(id);
  fetchNotifications();
  fetchUnreadCount();
};

const handleMarkAllAsRead = async () => {
  await markAllAsRead();
  fetchNotifications();
  fetchUnreadCount();
};

// For notifications list:
{notifications.map(notif => (
  <div key={notif.id} className={`notification ${notif.is_read ? 'read' : 'unread'}`}>
    <div className="notification-header">
      <span className="type">{notif.type}</span>
      <span className="time">{new Date(notif.created_at).toLocaleString()}</span>
    </div>
    <h4>{notif.title}</h4>
    <p>{notif.message}</p>
    {!notif.is_read && (
      <button onClick={() => handleMarkAsRead(notif.id)}>Mark as Read</button>
    )}
  </div>
))}

// Unread badge:
<div className="notification-badge">
  {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
</div>
```

---

### 7. Profile Admin (`ProfileAdmin.jsx`) - 🔧 NEEDS UPDATE

**Quick Integration:**
```javascript
import { getAdminProfile, updateAdminProfile, uploadImage } from '../../../config/supabase';

// In component:
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  const { data, error } = await getAdminProfile();
  if (data) setProfile(data);
  setLoading(false);
};

const handleUpdateProfile = async (updates) => {
  const { data, error } = await updateAdminProfile(profile.user_id, updates);
  if (data) {
    fetchProfile(); // Refresh
  }
};

const handlePhotoUpload = async (file) => {
  const path = `avatars/${profile.user_id}/${file.name}`;
  const { data } = await uploadImage('avatars', path, file);
  
  if (data?.publicUrl) {
    await handleUpdateProfile({ profile_photo_url: data.publicUrl });
  }
};

// Profile display:
{profile && (
  <div className="profile">
    <img src={profile.profile_photo_url || '/default-avatar.png'} alt={profile.full_name} />
    <h2>{profile.full_name}</h2>
    <p>{profile.email}</p>
    <p>Role: {profile.role}</p>
    <p>City: {profile.city}, {profile.province}</p>
    <p>Last Login: {new Date(profile.last_login_at).toLocaleString()}</p>
    <p>Login Count: {profile.login_count}</p>
    
    {profile.admin_profile && (
      <div className="admin-details">
        <p>Department: {profile.admin_profile.department}</p>
        {/* Show permissions */}
      </div>
    )}
  </div>
)}
```

---

### 8. Tambah Faktor Emisi (`TambahFaktorEmisi.jsx`)

**Quick Integration:**
```javascript
import { createEmissionFactor } from '../../../config/supabase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const { data, error } = await createEmissionFactor({
    vehicle_type: formData.vehicle_type,
    fuel_type: formData.fuel_type,
    cc_min: parseInt(formData.cc_min),
    cc_max: parseInt(formData.cc_max),
    emission_factor_min: parseFloat(formData.emission_factor_min),
    emission_factor_max: parseFloat(formData.emission_factor_max),
    description: formData.description
  });

  if (data) {
    // Success - redirect to list
    navigate('/faktor-emisi');
  } else {
    // Show error
    setError(error);
  }
};
```

---

### 9. Tambah Komunitas (`TambahKomunitas.jsx`)

**Quick Integration:**
```javascript
import { createCommunity, uploadImage } from '../../../config/supabase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Upload image first
  let imageUrl = null;
  if (formData.image) {
    const path = `communities/${Date.now()}_${formData.image.name}`;
    const { data } = await uploadImage('community-images', path, formData.image);
    imageUrl = data?.publicUrl;
  }
  
  // Create community
  const { data, error } = await createCommunity({
    name: formData.name,
    description: formData.description,
    location: formData.location,
    focus_area: formData.focus_area,
    carbon_price_per_kg: parseFloat(formData.carbon_price_per_kg),
    image_url: imageUrl,
    contact_email: formData.contact_email,
    contact_phone: formData.contact_phone,
    website: formData.website,
    is_active: true
  });

  if (data) {
    navigate('/komunitas');
  }
};
```

---

### 10. Tambah Edukasi (`TambahEdukasi.jsx`)

**Quick Integration:**
```javascript
import { createEducationContent, uploadImage } from '../../../config/supabase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Upload image
  let imageUrl = null;
  if (formData.image) {
    const path = `education/${Date.now()}_${formData.image.name}`;
    const { data } = await uploadImage('education-images', path, formData.image);
    imageUrl = data?.publicUrl;
  }
  
  // Create content
  const { data, error} = await createEducationContent({
    title: formData.title,
    description: formData.description,
    content: formData.content,
    category: formData.category,
    image_url: imageUrl,
    is_published: formData.is_published !== false,
    is_featured: formData.is_featured || false,
    tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
  });

  if (data) {
    navigate('/edukasi');
  }
};
```

---

## 🔧 General Pattern for All Pages

```javascript
// 1. Import helpers
import { functionName } from '../../../config/supabase';

// 2. State management
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// 3. Fetch on mount
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const { data, error } = await functionName();
    if (error) throw new Error(error);
    if (data) setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// 4. Display with loading/error states
{loading && <div>Loading...</div>}
{error && <div>Error: {error}</div>}
{!loading && !error && data.map(item => (...))}
```

---

## ✅ To Make All Pages Work:

1. **Run SQL First:**
   ```
   database/complete_integration.sql
   ```

2. **Update Each Component:**
   - Copy the "Quick Integration" code above
   - Replace hardcoded data with Supabase calls
   - Test individually

3. **Test Flow:**
   ```
   Login → Dashboard (stats show) → Each page (data shows) → Forms (can create/edit)
   ```

---

## 🎯 Priority Order:

1. ✅ Dashboard Home - DONE
2. ✅ Donasi Offset - DONE
3. 🔧 Komunitas - High priority (visible impact)
4. 🔧 Edukasi - High priority (content management)
5. 🔧 Faktor Emisi - Medium (admin tool)
6. 🔧 Notifikasi - Medium (nice to have)
7. 🔧 Profile Admin - Low (settings page)

---

**Need help with a specific page? Just ask!** Each page follows the same pattern - it's mostly copy-paste with the right function names.
