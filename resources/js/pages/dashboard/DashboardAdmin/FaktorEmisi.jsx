import React from "react";
import { FiPlus, FiEdit2, FiTrash2, FiTruck, FiActivity, FiTrendingUp, FiSearch, FiX, FiAlertCircle, FiLayers } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";

export default function FaktorEmisi() {
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  const data = [
    { 
      id: 1, 
      jenis: "Motor", 
      faktor: 1.12, 
      satuan: "Kg CO₂/Km",
      icon: "🏍️",
      kategori: "Roda 2",
      lastUpdate: "67 Jan 2022"
    },
    { 
      id: 2, 
      jenis: "Mobil", 
      faktor: 2.31, 
      satuan: "Kg CO₂/Km",
      icon: "🚗",
      kategori: "Roda 4",
      lastUpdate: "67 Jan 2023"
    },
    { 
      id: 3, 
      jenis: "Bus", 
      faktor: 3.45, 
      satuan: "Kg CO₂/Km",
      icon: "🚌",
      kategori: "Transportasi Umum",
      lastUpdate: "67 Jan 2024"
    },
    { 
      id: 4, 
      jenis: "Truk", 
      faktor: 4.22, 
      satuan: "Kg CO₂/Km",
      icon: "🚚",
      kategori: "Kendaraan Berat",
      lastUpdate: "67 Nov 2025"
    }
  ];

  const filteredData = data.filter(item =>
    item.jenis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueCategories = [...new Set(data.map(item => item.kategori))].length;

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditMode(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditItem(null);
  };

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
            Faktor Emisi Kendaraan
          </h1>
          <p style={{ color: '#5C6D5D' }}>Kelola data faktor emisi untuk perhitungan jejak karbon</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Total Jenis */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                   style={{ background: 'linear-gradient(to bottom right, #3E5F44, #6C8C73)' }}>
                <FiTruck size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Jenis</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{data.length}</p>
                <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Kendaraan</p>
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
                <FiLayers size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Kategori</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{uniqueCategories}</p>
                <p className="text-xs mt-1" style={{ color: '#6C8C73' }}>Jenis</p>
              </div>
            </div>
          </div>

        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }} size={20} />
              <input
                type="text"
                placeholder="Cari jenis kendaraan atau kategori..."
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

            {/* Add Button */}
            <button
              onClick={() => setShowModal(true)}
              className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105"
              style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
            >
              <FiPlus size={20} /> Tambah Faktor Emisi
            </button>
          </div>
        </div>

        {/* Content Cards/Table */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada data</h3>
            <p style={{ color: '#5C6D5D' }} className="mb-6">Mulai tambahkan faktor emisi kendaraan</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all inline-flex items-center gap-2"
              style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
            >
              <FiPlus size={20} /> Tambah Faktor Emisi Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 
                           overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 
                                    group-hover:scale-110 transition-transform duration-300"
                         style={{ background: 'linear-gradient(to bottom right, #F3F5F2, #e8ebe7)' }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl transition-colors mb-1"
                          style={{ color: '#1E1E1E' }}>
                        {item.jenis}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: 'rgba(108, 140, 115, 0.2)', color: '#6C8C73' }}>
                        {item.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Faktor Emisi Display */}
                  <div className="rounded-xl p-6 mb-4" 
                       style={{ background: 'linear-gradient(to bottom right, rgba(62, 95, 68, 0.1), rgba(108, 140, 115, 0.1))' }}>
                    <p className="text-sm mb-2" style={{ color: '#5C6D5D' }}>Faktor Emisi</p>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-bold" style={{ color: '#3E5F44' }}>
                        {item.faktor.toFixed(2)}
                      </p>
                      <p className="text-lg mb-1" style={{ color: '#5C6D5D' }}>Kg CO₂/Km</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-100"
                       style={{ color: '#5C6D5D' }}>
                    <span>Update terakhir:</span>
                    <span className="font-medium" style={{ color: '#1E1E1E' }}>{item.lastUpdate}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="flex-1 p-3 rounded-xl transition-all font-medium text-sm 
                                 flex items-center justify-center gap-2 hover:shadow-md transform hover:scale-105"
                      style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}
                    >
                      <FiEdit2 size={16} /> Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="flex-1 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl 
                                 transition-all font-medium text-sm flex items-center justify-center gap-2 
                                 hover:shadow-md transform hover:scale-105"
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

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl transform animate-slideUp">
            
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>
                  {editMode ? "Edit Faktor Emisi" : "Tambah Faktor Emisi"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              {/* Jenis Kendaraan */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Jenis Kendaraan</label>
                <select 
                  defaultValue={editMode ? editItem?.jenis : ""}
                  className="w-full border rounded-xl p-3 transition-all outline-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                >
                  <option value="">Pilih jenis kendaraan</option>
                  <option value="Motor">Motor 🏍️</option>
                  <option value="Mobil">Mobil 🚗</option>
                  <option value="Bus">Bus 🚌</option>
                  <option value="Truk">Truk 🚚</option>
                </select>
              </div>

              {/* Kategori */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Kategori</label>
                <select 
                  defaultValue={editMode ? editItem?.kategori : ""}
                  className="w-full border rounded-xl p-3 transition-all outline-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                >
                  <option value="">Pilih kategori</option>
                  <option value="Roda 2">Roda 2</option>
                  <option value="Roda 4">Roda 4</option>
                  <option value="Transportasi Umum">Transportasi Umum</option>
                  <option value="Kendaraan Berat">Kendaraan Berat</option>
                </select>
              </div>

              {/* Faktor Emisi */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>
                  Faktor Emisi (Kg CO₂/Km)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Contoh: 4.22"
                  defaultValue={editMode ? editItem?.faktor : ""}
                  className="w-full border rounded-xl p-3 transition-all outline-none"
                  style={{ borderColor: '#BCA88D' }}
                  onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                  onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                />
                <p className="text-xs mt-2" style={{ color: '#5C6D5D' }}>
                  💡 Tips: Masukkan nilai dengan 2 angka desimal untuk akurasi yang lebih baik
                </p>
              </div>

              {/* Keterangan */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Keterangan (Opsional)</label>
                <textarea
                  placeholder="Tambahkan catatan atau sumber data..."
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
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}
                >
                  Batal
                </button>

                <button className="flex-1 px-6 py-3 text-white rounded-xl 
                                   font-medium shadow-lg hover:shadow-xl transition-all"
                        style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                  {editMode ? "Update" : "Simpan"}
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
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>Hapus Faktor Emisi?</h3>
              <p style={{ color: '#5C6D5D' }} className="mb-6">
                Apakah Anda yakin ingin menghapus faktor emisi untuk "<strong>{itemToDelete?.jenis}</strong>"? 
                Data yang sudah dihapus tidak dapat dikembalikan.
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