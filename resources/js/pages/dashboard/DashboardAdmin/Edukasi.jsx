import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiTag, FiImage, FiSearch, FiX, FiUpload, FiEye } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { getEducationContent, createEducationContent, updateEducationContent, deleteEducationContent, incrementEducationViews, uploadImage } from "../../../config/supabase";

export default function Edukasi() {
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  // Supabase State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Actual file for upload

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    description: "",
    tags: ""
  });

  // Fetch Data
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data: content, error } = await getEducationContent();
      if (error) throw error;

      setData(content);
    } catch (err) {
      console.error('Error fetching education content:', err);
      // alert('Gagal memuat data edukasi');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Lingkungan", "Energi", "Kesehatan", "Teknologi"];

  const filteredData = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Unique Categories from actual data
  const uniqueCategoriesStats = [...new Set(data.filter(item => item.category).map(item => item.category))].length;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      description: "",
      tags: ""
    });
    setImagePreview(null);
    setImageFile(null);
    setEditMode(false);
    setEditItem(null);
    setShowModal(false);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditMode(true);
    setFormData({
      title: item.title,
      content: item.content || "", // Assuming we might have content
      category: item.category || "",
      description: item.description || "",
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || "")
    });
    setImagePreview(item.image_url);
    setImageFile(null); // Reset file input, use existing URL unless changed
    setShowModal(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      if (!itemToDelete) return;

      const { error } = await deleteEducationContent(itemToDelete.id);
      if (error) throw error;

      alert('Konten berhasil dihapus! ✅');
      await fetchContent();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // Validate
      if (!formData.title || !formData.category || !formData.content) {
        alert("Mohon lengkapi Judul, Kategori, dan Konten!");
        setSubmitting(false);
        return;
      }

      let imageUrl = editMode ? editItem.image_url : null;

      // Handle Image Upload
      if (imageFile) {
        const { url, error: uploadError } = await uploadImage(imageFile, 'education-images');
        if (uploadError) throw uploadError;
        imageUrl = url;
      }

      // Prepare payload
      // Convert tags string to array
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== "");

      const payload = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        description: formData.description,
        tags: tagsArray,
        image_url: imageUrl,
        is_published: true, // Default true for now
        updated_at: new Date()
      };

      if (editMode && editItem) {
        // UPDATE
        const { error } = await updateEducationContent(editItem.id, payload);
        if (error) throw error;
        alert('Konten berhasil diperbarui! ✅');
      } else {
        // CREATE
        const { error } = await createEducationContent(payload);
        if (error) throw error;
        alert('Konten berhasil dibuat! ✅');
      }

      await fetchContent();
      resetForm();

    } catch (err) {
      console.error('Submit error:', err);
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">

      <AppSidebar />

      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">
        <div className="p-6 space-y-6">


          {/* Header Section with Animation */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-4xl font-bold mb-2" style={{
              background: 'linear-gradient(to right, #3E5F44, #6C8C73)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Konten Edukasi
            </h1>
            <p style={{ color: '#5C6D5D' }}>Kelola konten edukasi untuk meningkatkan kesadaran lingkungan</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Total Konten */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ background: 'linear-gradient(to bottom right, #3E5F44, #6C8C73)' }}>
                  <FiBookOpen size={28} />
                </div>
                <div className="flex-1">
                  <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Konten</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{data.length}</p>
                  <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Aktif</p>
                </div>
              </div>
            </div>

            {/* Total Kategori */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
                  <FiTag size={28} />
                </div>
                <div className="flex-1">
                  <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Kategori</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{uniqueCategoriesStats}</p>
                  <p className="text-xs mt-1" style={{ color: '#6C8C73' }}>Unik</p>
                </div>
              </div>
            </div>

          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">

              {/* Search Input */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }} size={20} />
                <input
                  type="text"
                  placeholder="Cari konten edukasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl transition-all outline-none"
                  style={{
                    borderColor: '#e5e7eb',
                    focus: { borderColor: '#3E5F44' }
                  }}
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
                    onClick={() => setSelectedCategory(cat)}
                    className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300"
                    style={selectedCategory === cat ? {
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
                onClick={() => setShowModal(true)}
                className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105"
                style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
              >
                <FiPlus size={20} /> Tambah Konten
              </button>
            </div>
          </div>

          {/* Content Cards */}
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
              <p className="mt-2 text-gray-500">Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada konten</h3>
              <p style={{ color: '#5C6D5D' }} className="mb-6">Mulai tambahkan konten edukasi untuk ditampilkan di sini</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
              >
                <FiPlus size={20} /> Tambah Konten Pertama
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 
                           overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Preview */}
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100 text-gray-300">
                        <FiImage />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg transition-colors line-clamp-2"
                        style={{ color: '#1E1E1E' }}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}>
                        {item.category || "Uncategorized"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                      {item.description || item.content?.substring(0, 100)}...
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="flex-1 p-2 rounded-lg transition-all font-medium text-sm 
                                 flex items-center justify-center gap-2 hover:shadow-md"
                        style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}
                        title="Edit"
                      >
                        <FiEdit2 size={16} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="flex-1 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg 
                                 transition-all font-medium text-sm flex items-center justify-center gap-2 
                                 hover:shadow-md"
                        title="Hapus"
                      >
                        <FiTrash2 size={16} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Tambah Konten */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl transform animate-slideUp 
                          max-h-[90vh] overflow-y-auto">

              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>
                    {editMode ? "Edit Konten" : "Tambah Konten Edukasi"}
                  </h2>
                  <button
                    onClick={() => {
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Poster/Gambar</label>
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
                               border-dashed rounded-xl cursor-pointer transition-all overflow-hidden"
                      style={{
                        borderColor: '#BCA88D',
                        backgroundColor: '#F3F5F2'
                      }}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full group">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white font-medium">Klik untuk ganti</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <FiUpload size={32} style={{ color: '#5C6D5D' }} className="mb-2" />
                          <p className="text-sm" style={{ color: '#5C6D5D' }}>Klik untuk upload gambar</p>
                          <p className="text-xs mt-1" style={{ color: '#BCA88D' }}>PNG, JPG maksimal 5MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Judul */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Judul Konten</label>
                  <input
                    type="text"
                    placeholder="Masukkan judul konten..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-xl p-3 transition-all outline-none"
                    style={{ borderColor: '#BCA88D' }}
                  />
                </div>

                {/* Kategori */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-xl p-3 transition-all outline-none"
                    style={{ borderColor: '#BCA88D' }}
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Energi">Energi</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Tips">Tips</option>
                    <option value="Artikel">Artikel</option>
                    <option value="Berita">Berita</option>
                    <option value="Teknologi">Teknologi</option>
                  </select>
                </div>

                {/* Deskripsi Singkat */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Deskripsi Singkat</label>
                  <textarea
                    placeholder="Ringkasan singkat..."
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded-xl p-3 transition-all outline-none resize-none"
                    style={{ borderColor: '#BCA88D' }}
                  />
                </div>

                {/* Konten Utama */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Konten Utama</label>
                  <textarea
                    placeholder="Tulis konten lengkap di sini..."
                    rows="6"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full border rounded-xl p-3 transition-all outline-none resize-none"
                    style={{ borderColor: '#BCA88D' }}
                  />
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    placeholder="Contoh: daur ulang, sampah, plastik"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full border rounded-xl p-3 transition-all outline-none"
                    style={{ borderColor: '#BCA88D' }}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
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
                                   font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        Menyimpan...
                      </>
                    ) : editMode ? "Update Konten" : "Terbitkan Konten"}
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
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>Hapus Konten?</h3>
                <p style={{ color: '#5C6D5D' }} className="mb-6">
                  Apakah Anda yakin ingin menghapus "<strong>{itemToDelete?.title}</strong>"?
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
  );
}