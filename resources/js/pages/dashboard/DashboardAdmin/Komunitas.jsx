import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiMapPin, FiCalendar, FiSearch, FiX, FiUpload, FiMail, FiPhone, FiGlobe, FiClock, FiTrendingUp } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";

export default function Komunitas() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const communities = [
    {
      id: 1,
      nama: "Komunitas 1",
      lokasi: "Lokasi 1",
      anggota: 245,
      deskripsi: "yayaya saya setuju",
      kontak: "kom1@email.com",
      phone: "+62 812-3456-7890",
      website: "www.kom1.id",
      tanggal: "15 Jan 2024",
      status: "aktif",
      kategori: "Transportasi",
      image: "🚴"
    },
    {
      id: 2,
      nama: "Komunitas 2",
      lokasi: "Lokasi 2",
      anggota: 189,
      deskripsi: "eyyy six sevenn",
      kontak: "kom2@email.com",
      phone: "+62 812345",
      website: "www.kom2.org",
      tanggal: "22 Feb 2024",
      status: "aktif",
      kategori: "Lingkungan",
      image: "🌿"
    },
    {
      id: 3,
      nama: "Komunitas 3",
      lokasi: "Lokasi 3",
      anggota: 312,
      deskripsi: "masukkan teks",
      kontak: "kom3@email.com",
      phone: "+62 123456",
      website: "www.kom3.com",
      tanggal: "10 Mar 2024",
      status: "aktif",
      kategori: "Transportasi",
      image: "🚗"
    },
    {
      id: 4,
      nama: "Komunitas 4",
      lokasi: "Lokasi 4",
      anggota: 156,
      deskripsi: "yayayaya",
      kontak: "kom4@email.com",
      phone: "+123456",
      website: "www.kom4.com",
      tanggal: "5 Apr 2024",
      status: "aktif",
      kategori: "Lingkungan",
      image: "♻️"
    },
  ];

  const categories = ["all", "Transportasi", "Lingkungan", "Energi", "Edukasi"];

  const filteredCommunities = communities.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === "all" || item.kategori === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  const totalMembers = communities.reduce((sum, com) => sum + com.anggota, 0);

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
        {/* Header Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Komunitas
          </h1>
          <p className="text-gray-600">Kelola dan hubungkan dengan komunitas peduli lingkungan</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          {/* Total Komunitas */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiUsers size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Total Komunitas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{communities.length}</p>
                <p className="text-xs text-green-600 mt-1">Aktif</p>
              </div>
            </div>
          </div>

          {/* Total Anggota */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiTrendingUp size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Total Anggota</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalMembers}</p>
                <p className="text-xs text-blue-600 mt-1">+12% bulan ini</p>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiMapPin size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Daerah Tercakup</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">4</p>
                <p className="text-xs text-purple-600 mt-1">Lokasi</p>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiCalendar size={28} />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">Kategori</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">3</p>
                <p className="text-xs text-orange-600 mt-1">Aktif</p>
              </div>
            </div>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari komunitas atau lokasi..."
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
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedFilter === cat
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
              <FiPlus size={20} /> Tambah Komunitas
            </button>
          </div>
        </div>

        {/* Content Cards */}
        {filteredCommunities.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada komunitas</h3>
            <p className="text-gray-500 mb-6">Mulai tambahkan komunitas untuk ditampilkan di sini</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl 
                         font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl 
                                    flex items-center justify-center text-3xl flex-shrink-0 
                                    group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 
                                     transition-colors mb-1">
                        {item.nama}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin size={14} />
                        <span>{item.lokasi}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.deskripsi}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FiUsers size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Anggota</p>
                        <p className="text-sm font-semibold text-gray-800">{item.anggota}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <FiCalendar size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bergabung</p>
                        <p className="text-sm font-semibold text-gray-800">{item.tanggal}</p>
                      </div>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                      {item.kategori}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMail size={14} />
                      <span className="truncate">{item.kontak}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiPhone size={14} />
                      <span>{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiGlobe size={14} />
                      <span className="truncate">{item.website}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-blue-600 
                                 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl 
                                 transition-all font-medium text-sm flex items-center justify-center gap-2 
                                 hover:shadow-lg transform hover:scale-105"
                    >
                      Lihat Detail
                    </button>

                    <button
                      className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl 
                                 transition-all hover:shadow-md"
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

      {/* Modal Tambah Komunitas */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform animate-slideUp 
                          max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Tambah Komunitas</h2>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Logo Komunitas</label>
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
                        <p className="text-sm text-gray-500">Klik untuk upload logo</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG maksimal 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Nama Komunitas */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Komunitas</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama komunitas..."
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Lokasi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Kota/Kabupaten"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                  <select className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 
                                     focus:ring-green-500 focus:border-transparent transition-all outline-none">
                    <option>Pilih kategori</option>
                    <option>Transportasi</option>
                    <option>Lingkungan</option>
                    <option>Energi</option>
                    <option>Edukasi</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Kontak</label>
                  <input
                    type="email"
                    placeholder="email@komunitas.com"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    placeholder="+62 812-3456-7890"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Website */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    placeholder="https://www.komunitas.com"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    placeholder="Tulis deskripsi tentang komunitas..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 
                               focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Komunitas?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus "<strong>{itemToDelete?.nama}</strong>"? 
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