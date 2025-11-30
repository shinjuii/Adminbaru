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
    { id: 1, judul: "Ayo Kurangi Emisi Kendaraan!", kategori: "Lingkungan", views: 245, image: "🌱" },
    { id: 2, judul: "Cara Hemat Energi di Rumah", kategori: "Energi", views: 189, image: "⚡" },
    { id: 3, judul: "Manfaat Jalan Kaki", kategori: "Kesehatan", views: 312, image: "🚶" },
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">

      {/* ==== SIDEBAR ==== */}
      <AppSidebar />

      {/* ==== CONTENT WRAPPER (GESER KANAN) ==== */}
      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">

        {/* ==== PADDING dalam konten ==== */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">

        {/* Header Section with Animation */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Konten Edukasi
          </h1>
          <p className="text-gray-600">Kelola konten edukasi untuk meningkatkan kesadaran lingkungan</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Konten */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiBookOpen size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Total Konten</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{data.length}</p>
                <p className="text-xs text-green-600 mt-1">+2 bulan ini</p>
              </div>
            </div>
          </div>

          {/* Total Kategori */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiTag size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Total Kategori</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">3</p>
                <p className="text-xs text-blue-600 mt-1">Aktif</p>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiEye size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">746</p>
                <p className="text-xs text-purple-600 mt-1">+15% minggu ini</p>
              </div>
            </div>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari konten edukasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 
                           focus:ring-green-500 focus:border-transparent transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 transition-colors"
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
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "Semua" : cat}
                </button>
              ))}
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                         text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105"
            >
              <FiPlus size={20} /> Tambah Konten
            </button>
          </div>
        </div>

        {/* Content Cards */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada konten</h3>
            <p className="text-gray-500 mb-6">Mulai tambahkan konten edukasi untuk ditampilkan di sini</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl 
                         font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
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
                <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center 
                                justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {item.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 
                                   transition-colors line-clamp-2">
                      {item.judul}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.kategori}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <FiEye size={14} />
                      {item.views}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      className="flex-1 p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg 
                                 transition-all font-medium text-sm flex items-center justify-center gap-2 
                                 hover:shadow-md"
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
                <h2 className="text-2xl font-bold text-gray-800">Tambah Konten Edukasi</h2>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poster/Gambar</label>
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
                               border-dashed border-gray-300 rounded-xl cursor-pointer 
                               hover:border-green-500 transition-all bg-gray-50 hover:bg-green-50"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <FiUpload size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Klik untuk upload gambar</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG maksimal 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Judul */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Konten</label>
                <input
                  type="text"
                  placeholder="Masukkan judul konten..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                             focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* URL */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/artikel"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                             focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Kategori */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                <select className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 
                                   focus:ring-green-500 focus:border-transparent transition-all outline-none">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
                <textarea
                  placeholder="Tulis deskripsi singkat tentang konten..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                             focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setImagePreview(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl 
                             font-medium transition-all"
                >
                  Batal
                </button>

                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                                   hover:from-green-600 hover:to-green-700 text-white rounded-xl 
                                   font-medium shadow-lg hover:shadow-xl transition-all">
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Konten?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus "<strong>{itemToDelete?.judul}</strong>"? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setItemToDelete(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl 
                             font-medium transition-all"
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