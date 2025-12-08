import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBell, FiAlertCircle, FiCheckCircle, FiClock, FiX, FiCalendar, FiTarget, FiSearch } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";

export default function Notifikasi() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      judul: "Update sistem",
      isiPesan: "-",
      target: "Semua",
      tanggal: "20 Sep 2025",
      status: "Terkirim",
      icon: "🔄",
      kategori: "sistem"
    },
    {
      id: 2,
      judul: "Yuk Kurangi Emisi",
      isiPesan: "Ayo donasi",
      target: "Semua",
      tanggal: "21 Sep 2025",
      status: "Terkirim",
      icon: "🎁",
      kategori: "reminder"
    },
    {
      id: 3,
      judul: "Pengingat",
      isiPesan: "-",
      target: "Semua",
      tanggal: "22 Sep 2025",
      status: "Terkirim",
      icon: "⏰",
      kategori: "reminder"
    }
  ];

  const statusOptions = ["Terkirim", "Pending", "Gagal"];
  const targetOptions = ["Semua", "User", "Admin", "Komunitas"];
  const filters = ["all", "Terkirim", "Pending", "Gagal"];

  const filteredNotifications = notifications.filter(item => {
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.isiPesan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalSent = notifications.filter(n => n.status === "Terkirim").length;
  const totalPending = notifications.filter(n => n.status === "Pending").length;
  const totalFailed = notifications.filter(n => n.status === "Gagal").length;

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

  const getStatusColor = (status) => {
    switch(status) {
      case "Terkirim": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Gagal": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Terkirim": return <FiCheckCircle size={16} />;
      case "Pending": return <FiClock size={16} />;
      case "Gagal": return <FiAlertCircle size={16} />;
      default: return <FiBell size={16} />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F5F2' }}>

      {/* ==== SIDEBAR ==== */}
      <AppSidebar />

      {/* ==== CONTENT WRAPPER (GESER KANAN) ==== */}
      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">

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
            Notifikasi
          </h1>
          <p style={{ color: '#5C6D5D' }}>Kelola dan kirim notifikasi kepada pengguna</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          {/* Total Notifikasi */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                   style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
                <FiBell size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Total Notifikasi</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{notifications.length}</p>
                <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Semua</p>
              </div>
            </div>
          </div>

          {/* Terkirim */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                   style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
                <FiCheckCircle size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Terkirim</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{totalSent}</p>
                <p className="text-xs mt-1" style={{ color: '#3E5F44' }}>Sukses</p>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiClock size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{totalPending}</p>
                <p className="text-xs text-yellow-600 mt-1">Menunggu</p>
              </div>
            </div>
          </div>

          {/* Gagal */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiAlertCircle size={28} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium">Gagal</p>
                <p className="text-3xl font-bold mt-1" style={{ color: '#1E1E1E' }}>{totalFailed}</p>
                <p className="text-xs text-red-600 mt-1">Error</p>
              </div>
            </div>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                        style={{ color: '#5C6D5D' }} size={20} />
              <input
                type="text"
                placeholder="Cari notifikasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl transition-all outline-none"
                style={{
                  borderColor: searchQuery ? '#3E5F44' : '#e5e7eb'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                onBlur={(e) => e.target.style.borderColor = searchQuery ? '#3E5F44' : '#e5e7eb'}
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

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedFilter === filter
                      ? "text-white shadow-lg scale-105"
                      : "hover:bg-gray-200"
                  }`}
                  style={{
                    background: selectedFilter === filter 
                      ? 'linear-gradient(to right, #3E5F44, #6C8C73)'
                      : '#f3f4f6',
                    color: selectedFilter === filter ? '#ffffff' : '#5C6D5D'
                  }}
                >
                  {filter === "all" ? "Semua" : filter}
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
              <FiPlus size={20} /> Tambah Notifikasi
            </button>
          </div>
        </div>

        {/* Notifications Table */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada notifikasi</h3>
            <p style={{ color: '#5C6D5D' }} className="mb-6">Mulai tambahkan notifikasi untuk pengguna</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl 
                         transition-all inline-flex items-center gap-2"
              style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
            >
              <FiPlus size={20} /> Tambah Notifikasi Pertama
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="text-white p-4" style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm">
                <div className="col-span-3">Judul</div>
                <div className="col-span-2">Isi Pesan</div>
                <div className="col-span-2">Target</div>
                <div className="col-span-2">Tanggal</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-center">Aksi</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 transition-colors items-center hover-row"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Judul */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                         style={{ background: 'linear-gradient(to bottom right, rgba(108, 140, 115, 0.2), rgba(62, 95, 68, 0.2))' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#1E1E1E' }}>{item.judul}</p>
                      <p className="text-xs" style={{ color: '#5C6D5D' }}>{item.kategori}</p>
                    </div>
                  </div>

                  {/* Isi Pesan */}
                  <div className="col-span-2 text-sm" style={{ color: '#5C6D5D' }}>
                    {item.isiPesan}
                  </div>

                  {/* Target */}
                  <div className="col-span-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1"
                          style={{ background: 'rgba(188, 168, 141, 0.2)', color: '#BCA88D' }}>
                      <FiTarget size={12} />
                      {item.target}
                    </span>
                  </div>

                  {/* Tanggal */}
                  <div className="col-span-2 text-sm flex items-center gap-2" style={{ color: '#5C6D5D' }}>
                    <FiCalendar size={14} style={{ color: '#5C6D5D' }} />
                    {item.tanggal}
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-2 rounded-lg transition-all"
                      style={{ background: 'rgba(108, 140, 115, 0.1)', color: '#3E5F44' }}
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                      title="Hapus"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform animate-slideUp 
                          max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>
                  {editMode ? "Edit Notifikasi" : "Tambah Notifikasi"}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Judul */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Judul Notifikasi</label>
                  <input
                    type="text"
                    placeholder="Masukkan judul notifikasi..."
                    defaultValue={editMode ? editItem?.judul : ""}
                    className="w-full border border-gray-300 rounded-xl p-3 transition-all outline-none focus-input"
                  />
                </div>

                {/* Target */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Target Penerima</label>
                  <select 
                    defaultValue={editMode ? editItem?.target : ""}
                    className="w-full border border-gray-300 rounded-xl p-3 transition-all outline-none focus-input"
                  >
                    <option value="">Pilih target</option>
                    {targetOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Status</label>
                  <select 
                    defaultValue={editMode ? editItem?.status : "Pending"}
                    className="w-full border border-gray-300 rounded-xl p-3 transition-all outline-none focus-input"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Tanggal */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Tanggal Kirim</label>
                  <input
                    type="date"
                    defaultValue={editMode ? editItem?.tanggal : ""}
                    className="w-full border border-gray-300 rounded-xl p-3 transition-all outline-none focus-input"
                  />
                </div>

                {/* Isi Pesan */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Isi Pesan</label>
                  <textarea
                    placeholder="Tulis isi notifikasi..."
                    rows="4"
                    defaultValue={editMode ? editItem?.isiPesan : ""}
                    className="w-full border border-gray-300 rounded-xl p-3 transition-all outline-none resize-none focus-input"
                  />
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ background: '#F3F5F2', color: '#5C6D5D' }}
                >
                  Batal
                </button>

                <button className="flex-1 px-6 py-3 text-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all"
                        style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                  {editMode ? "Update" : "Kirim"}
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
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>Hapus Notifikasi?</h3>
              <p className="mb-6" style={{ color: '#5C6D5D' }}>
                Apakah Anda yakin ingin menghapus notifikasi "<strong>{itemToDelete?.judul}</strong>"? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setItemToDelete(null);
                  }}
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ background: '#F3F5F2', color: '#5C6D5D' }}
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

        .hover-row:hover {
          background-color: rgba(108, 140, 115, 0.05);
        }

        .focus-input:focus {
          border-color: #3E5F44 !important;
          box-shadow: 0 0 0 3px rgba(62, 95, 68, 0.1);
        }
      `}</style>
    </div>
</div>
  );
}