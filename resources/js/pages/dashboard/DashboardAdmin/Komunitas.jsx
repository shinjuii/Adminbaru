import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiMapPin, FiCalendar, FiSearch, FiX, FiUpload, FiMail, FiPhone, FiGlobe, FiClock, FiTrendingUp } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { getCommunitiesWithStats, createCommunity, updateCommunity, deleteCommunity, uploadImage } from "../../../config/supabase";

export default function Komunitas() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false); // New: Detail Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    focus_area: "Transportasi",
    contact_email: "",
    contact_phone: "",
    website: "",
    description: "",
    image_file: null
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  // Supabase integration
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = ["all", "Transportasi", "Lingkungan", "Energi", "Edukasi"];

  // Fetch communities from Supabase on mount
  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await getCommunitiesWithStats();
      if (fetchError) throw new Error(fetchError);

      // Transform data to match UI structure
      const transformed = data ? data.map(c => ({
        id: c.id,
        nama: c.name,
        lokasi: c.location || '',
        deskripsi: c.description || '',
        kontak: c.contact_email || '',
        phone: c.contact_phone || '',
        website: c.website || '',
        tanggal: new Date(c.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        status: c.is_active ? 'aktif' : 'nonaktif',
        kategori: c.focus_area || 'Umum',
        // Handle image: if image_url exists and is valid URL, use it; otherwise use default emoji
        image: (c.image_url && (c.image_url.startsWith('http://') || c.image_url.startsWith('https://')))
          ? c.image_url
          : '🏘️',
        // Stats from view
        member_count: c.member_count || 0,
        total_received: c.total_received || 0,
        total_carbon_offset: c.total_carbon_offset || 0,
        original_data: c // Keep original for editing
      })) : [];

      console.log('Communities fetched:', transformed.length);
      setCommunities(transformed);
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // HANDLERS
  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      focus_area: "Transportasi",
      contact_email: "",
      contact_phone: "",
      website: "",
      description: "",
      image_file: null
    });
    setImagePreview(null);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleOpenCreateTarget = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    const raw = item.original_data || {};
    setFormData({
      name: raw.name || item.nama,
      location: raw.location || item.lokasi,
      focus_area: raw.focus_area || item.kategori,
      contact_email: raw.contact_email || item.kontak,
      contact_phone: raw.contact_phone || item.phone,
      website: raw.website || item.website,
      description: raw.description || item.deskripsi,
      image_file: null
    });

    // Set preview if it's a valid URL
    if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
      setImagePreview(item.image);
    } else {
      setImagePreview(null);
    }

    setCurrentId(item.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      if (!itemToDelete) return;

      const { error } = await deleteCommunity(itemToDelete.id);
      if (error) throw error;

      await fetchCommunities();
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleViewDetail = (item) => {
    setDetailItem(item);
    setShowDetailModal(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      console.log('Submitting form...', { editMode, currentId, formData });

      let imageUrl = editMode ? (communities.find(c => c.id === currentId)?.original_data?.image_url) : null;

      // Upload image if new file selected
      if (formData.image_file) {
        const path = `communities/${Date.now()}_${formData.image_file.name}`;
        const { data: uploadData, error: uploadError } = await uploadImage('community-images', path, formData.image_file);

        if (uploadError) throw new Error("Gagal upload gambar: " + uploadError.message);
        if (uploadData?.publicUrl) imageUrl = uploadData.publicUrl;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        focus_area: formData.focus_area,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        website: formData.website,
        image_url: imageUrl,
        is_active: true,
        updated_at: new Date() // Force timestamp update
      };

      console.log('Payload:', payload);

      if (editMode && currentId) {
        // UPDATE
        const { error } = await updateCommunity(currentId, payload);
        if (error) {
          console.error('Update error:', error);
          throw new Error("Gagal update database: " + error.message);
        }
        alert("Data berhasil diperbarui! ✅");
      } else {
        // CREATE
        const { error } = await createCommunity(payload);
        if (error) {
          console.error('Create error:', error);
          throw new Error("Gagal simpan ke database: " + error.message);
        }
        alert("Data berhasil ditambahkan! ✅");
      }

      await fetchCommunities();
      setShowModal(false);
      resetForm();

    } catch (err) {
      console.error('Submit caught error:', err);
      alert("TERJADI ERROR: " + err.message + "\n\nCek apakah Anda memiliki izin edit/tambah?");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image_file: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const filteredCommunities = communities.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === "all" || item.kategori === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-background">

      <AppSidebar />

      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">
        <div className="p-6 space-y-6">


          {/* ==== PADDING dalam konten ==== */}
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 animate-fadeIn">
              <h1 className="text-4xl font-bold mb-2" style={{
                background: 'linear-gradient(to right, #3E5F44, #6C8C73)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Komunitas
              </h1>
              <p style={{ color: '#5C6D5D' }}>Kelola dan hubungkan dengan komunitas peduli lingkungan</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* Total Komunitas */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #3E5F44, #6C8C73)' }}>
                    <FiUsers size={28} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Komunitas</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{communities.length}</p>
                    <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Aktif</p>
                  </div>
                </div>
              </div>

              {/* Lokasi */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #BCA88D, #9a8a75)' }}>
                    <FiMapPin size={28} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Daerah Tercakup</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>4</p>
                    <p className="text-xs mt-1" style={{ color: '#BCA88D' }}>Lokasi</p>
                  </div>
                </div>
              </div>

              {/* Kategori */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
                    <FiCalendar size={28} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Kategori</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>3</p>
                    <p className="text-xs mt-1" style={{ color: '#6C8C73' }}>Aktif</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">

                {/* Search Input */}
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }} size={20} />
                  <input
                    type="text"
                    placeholder="Cari komunitas atau lokasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl transition-all outline-none"
                    style={{ borderColor: '#e5e7eb' }}
                    onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                      style={{ color: '#5C6D5D' }}
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFilter(cat)}
                      className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300"
                      style={selectedFilter === cat ? {
                        background: 'linear-gradient(to right, #3E5F44, #6C8C73)',
                        color: 'white',
                        transform: 'scale(1.05)'
                      } : {
                        backgroundColor: '#F3F5F2',
                        color: '#5C6D5D'
                      }}
                    >
                      {cat === "all" ? "Semua" : cat}
                    </button>
                  ))}
                </div>

                {/* Add Button */}
                <button
                  onClick={handleOpenCreateTarget}
                  className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105"
                  style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
                >
                  <FiPlus size={20} /> Tambah Komunitas
                </button>
              </div>
            </div>

            {/* Content Cards */}
            {filteredCommunities.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada komunitas</h3>
                <p style={{ color: '#5C6D5D' }} className="mb-6">Mulai tambahkan komunitas untuk ditampilkan di sini</p>
                <button
                  onClick={handleOpenCreateTarget}
                  className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
                >
                  <FiPlus size={20} /> Tambah Komunitas Pertama
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCommunities.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 
                           overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6">

                      {/* Header with Icon and Status */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 
                                    group-hover:scale-110 transition-transform duration-300 overflow-hidden"
                          style={{ background: 'linear-gradient(to bottom right, #F3F5F2, #e8ebe7)' }}>
                          {item.image && item.image.startsWith('http') ? (
                            <img
                              src={item.image}
                              alt={item.nama}
                              className="w-full h-full object-cover"
                              onError={(e) => {
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
                        <div className="flex-1">
                          <h3 className="font-bold text-lg transition-colors mb-1"
                            style={{ color: '#1E1E1E' }}>
                            {item.nama}
                          </h3>
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#5C6D5D' }}>
                            <FiMapPin size={14} />
                            <span>{item.lokasi}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}>
                          {item.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: '#5C6D5D' }}>{item.deskripsi}</p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(188, 168, 141, 0.2)' }}>
                            <FiCalendar size={16} style={{ color: '#BCA88D' }} />
                          </div>
                          <div>
                            <p className="text-xs" style={{ color: '#5C6D5D' }}>Bergabung</p>
                            <p className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{item.tanggal}</p>
                          </div>
                        </div>
                        <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'rgba(108, 140, 115, 0.2)', color: '#6C8C73' }}>
                          {item.kategori}
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#5C6D5D' }}>
                          <FiMail size={14} />
                          <span className="truncate">{item.kontak}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#5C6D5D' }}>
                          <FiPhone size={14} />
                          <span>{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#5C6D5D' }}>
                          <FiGlobe size={14} />
                          <span className="truncate">{item.website}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="flex-1 p-3 text-white rounded-xl transition-all font-medium text-sm 
                                 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105"
                          style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
                        >
                          Lihat Detail
                        </button>

                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-3 rounded-xl transition-all hover:shadow-md"
                          style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl 
                                 transition-all hover:shadow-md"
                          title="Hapus"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Modal Tambah/Edit Komunitas */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
              <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform animate-slideUp 
                          max-h-[90vh] overflow-y-auto">

                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>
                      {editMode ? "Edit Komunitas" : "Tambah Komunitas"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">

                  {/* Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Logo Komunitas</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 
                               border-dashed rounded-xl cursor-pointer transition-all"
                        style={{
                          borderColor: '#BCA88D',
                          backgroundColor: '#F3F5F2'
                        }}
                      >
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <>
                            <FiUpload size={32} style={{ color: '#5C6D5D' }} className="mb-2" />
                            <p className="text-sm" style={{ color: '#5C6D5D' }}>Klik untuk upload logo</p>
                            <p className="text-xs mt-1" style={{ color: '#BCA88D' }}>PNG, JPG maksimal 5MB</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Nama Komunitas */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Nama Komunitas</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama komunitas..."
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Lokasi</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Kota/Kabupaten"
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                    {/* Kategori */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Kategori</label>
                      <select
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                        value={formData.focus_area}
                        onChange={(e) => setFormData({ ...formData, focus_area: e.target.value })}
                      >
                        {categories.filter(c => c !== 'all').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Email Kontak</label>
                      <input
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        placeholder="email@komunitas.com"
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Nomor Telepon</label>
                      <input
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                        placeholder="+62 812-3456-7890"
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                    {/* Website */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://www.komunitas.com"
                        className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                    {/* Deskripsi */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Deskripsi</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tulis deskripsi tentang komunitas..."
                        rows="4"
                        className="w-full border rounded-xl p-3 transition-all outline-none resize-none"
                        style={{ borderColor: '#BCA88D' }}
                      />
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      disabled={submitting}
                      className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                      style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}
                    >
                      Batal
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 px-6 py-3 text-white rounded-xl 
                                   font-medium shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                      style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menyimpan...
                        </>
                      ) : (
                        editMode ? "Update" : "Simpan"
                      )}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Modal Detail Komunitas */}
          {showDetailModal && detailItem && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
              <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform animate-slideUp max-h-[90vh] overflow-y-auto">

                {/* Header Image */}
                <div className="relative h-48 w-full bg-gray-100">
                  {detailItem.image && detailItem.image.startsWith('http') ? (
                    <img src={detailItem.image} alt={detailItem.nama} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-green-50">
                      {detailItem.image}
                    </div>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <FiX size={20} color="#1E1E1E" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: '#1E1E1E' }}>{detailItem.nama}</h2>
                      <div className="flex items-center gap-2 text-sm" style={{ color: '#5C6D5D' }}>
                        <FiMapPin size={16} />
                        <span>{detailItem.lokasi}</span>
                      </div>
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}>
                      {detailItem.kategori}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-1">Anggota</p>
                      <p className="text-xl font-bold text-gray-800">{detailItem.member_count}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-1">Total Donasi</p>
                      <p className="text-xl font-bold text-gray-800">Rp {detailItem.total_received?.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-1">Emisi Offset</p>
                      <p className="text-xl font-bold text-gray-800">{detailItem.total_carbon_offset} kg</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1E1E1E' }}>Tentang Komunitas</h3>
                    <p style={{ color: '#5C6D5D', lineHeight: '1.6' }}>
                      {detailItem.deskripsi || "Tidak ada deskripsi."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <FiMail className="text-green-700" />
                      <span className="text-gray-600">{detailItem.kontak || "-"}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <FiPhone className="text-green-700" />
                      <span className="text-gray-600">{detailItem.phone || "-"}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 md:col-span-2">
                      <FiGlobe className="text-green-700" />
                      <a href={detailItem.website} target="_blank" rel="noreferrer" className="text-green-700 hover:underline">
                        {detailItem.website || "-"}
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleEditClick(detailItem);
                      }}
                      className="flex-1 py-3 rounded-xl border-2 border-green-700 text-green-700 font-bold hover:bg-green-50 transition-all"
                    >
                      Edit Komunitas
                    </button>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="flex-1 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800 transition-all"
                    >
                      Tutup
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform animate-slideUp p-6">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <FiTrash2 size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>Hapus Komunitas?</h3>
                  <p style={{ color: '#5C6D5D' }} className="mb-6">
                    Apakah Anda yakin ingin menghapus "<strong>{itemToDelete?.nama}</strong>"?
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setItemToDelete(null);
                      }}
                      className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                      style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
                             hover:from-red-600 hover:to-red-700 text-white rounded-xl 
                             font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </div>
      </div>
    </div>
  );
}