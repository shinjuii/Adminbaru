import React from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiTag, FiImage, FiSearch, FiX, FiUpload, FiEye } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";

export default function Edukasi() {
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const data = [
    { id: 1, judul: "Ayo Kurangi Emisi Kendaraan!", kategori: "Lingkungan", image: "🌱" },
    { id: 2, judul: "Cara Hemat Energi di Rumah", kategori: "Energi", image: "⚡" },
    { id: 3, judul: "Manfaat Jalan Kaki", kategori: "Kesehatan", image: "🚶" },
  ];

  const categories = ["all", "Lingkungan", "Energi", "Kesehatan"];

  const filteredData = data.filter(item => {
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    // Handle delete logic here
    setShowDeleteConfirm(false);
    setItemToDelete(null);
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
                <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>+2 bulan ini</p>
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
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>3</p>
                <p className="text-xs mt-1" style={{ color: '#6C8C73' }}>Aktif</p>
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
        {filteredData.length === 0 ? (
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
                <div className="h-48 flex items-center 
                                justify-center text-6xl group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'linear-gradient(to bottom right, #F3F5F2, #e8ebe7)' }}>
                  {item.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg transition-colors line-clamp-2"
                        style={{ color: '#1E1E1E' }}>
                      {item.judul}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}>
                      {item.kategori}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
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
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>Tambah Konten Edukasi</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setImagePreview(null);
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
                  className="w-full border rounded-xl p-3 transition-all outline-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                />
              </div>

              {/* URL */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Link URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/artikel"
                  className="w-full border rounded-xl p-3 transition-all outline-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                />
              </div>

              {/* Kategori */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Kategori</label>
                <select className="w-full border rounded-xl p-3 transition-all outline-none"
                        style={{ borderColor: '#BCA88D' }}
                        onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                        onBlur={(e) => e.target.style.borderColor = '#BCA88D'}>
                  <option>Pilih kategori</option>
                  <option>Lingkungan</option>
                  <option>Energi</option>
                  <option>Kesehatan</option>
                  <option>Tips</option>
                  <option>Artikel</option>
                  <option>Berita</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Deskripsi Singkat</label>
                <textarea
                  placeholder="Tulis deskripsi singkat tentang konten..."
                  rows="3"
                  className="w-full border rounded-xl p-3 transition-all outline-none resize-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setImagePreview(null);
                  }}
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}
                >
                  Batal
                </button>

                <button className="flex-1 px-6 py-3 text-white rounded-xl 
                                   font-medium shadow-lg hover:shadow-xl transition-all"
                        style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                  Simpan
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
                Apakah Anda yakin ingin menghapus "<strong>{itemToDelete?.judul}</strong>"? 
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