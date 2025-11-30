import React, { useState } from "react";
import { FiDownload, FiFilter, FiDollarSign, FiUsers, FiTrendingUp, FiCalendar, FiSearch, FiX, FiEye, FiPrinter } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
export default function LaporanDonasi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const donations = [
    {
      id: 1,
      namaUser: "Andi",
      nominalDonasi: "Rp 5.000.000",
      nominalValue: 5000000,
      komunitasTujuan: "Komunitas 1",
      status: "Sukses",
      tanggalDonasi: "26 Sep 2025"
    },
    {
      id: 2,
      namaUser: "Andi",
      nominalDonasi: "Rp 2.000.000",
      nominalValue: 2000000,
      komunitasTujuan: "Komunitas 5",
      status: "Sukses",
      tanggalDonasi: "21 Sep 2025"
    },
    {
      id: 3,
      namaUser: "Budi",
      nominalDonasi: "Rp 500.000",
      nominalValue: 500000,
      komunitasTujuan: "Komunitas 3",
      status: "Sukses",
      tanggalDonasi: "15 Sep 2025"
    },
    {
      id: 4,
      namaUser: "Tono",
      nominalDonasi: "Rp 100.000",
      nominalValue: 100000,
      komunitasTujuan: "Komunitas 12",
      status: "Sukses",
      tanggalDonasi: "9 Sep 2025"
    }
  ];

  const statusOptions = ["all", "Sukses", "Pending", "Gagal"];

  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.namaUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.komunitasTujuan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedFilter === "all" || item.status === selectedFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalDonasi = donations.reduce((sum, item) => sum + item.nominalValue, 0);
  const jumlahKomunitas = [...new Set(donations.map(item => item.komunitasTujuan))].length;
  const totalEmisi = 1.5; // Static value as shown in image

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Sukses": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Gagal": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleExport = () => {
    alert("Export data ke Excel/PDF");
  };

  const handlePrint = () => {
    window.print();
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
            Laporan Donasi
          </h1>
          <p className="text-gray-600">Ringkasan dan detail semua transaksi donasi</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Donasi */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiDollarSign size={28} />
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Donasi</p>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalDonasi).replace('Rp', 'RP')}</p>
            <p className="text-xs text-green-600 mt-2">+12% dari bulan lalu</p>
          </div>

          {/* Jumlah Komunitas */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiUsers size={28} />
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Komunitas</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Jumlah Komunitas</p>
            <p className="text-3xl font-bold text-gray-800">{jumlahKomunitas}</p>
            <p className="text-xs text-blue-600 mt-2">Penerima aktif</p>
          </div>

          {/* Total Emisi */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiTrendingUp size={28} />
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Dampak</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Emisi</p>
            <p className="text-3xl font-bold text-gray-800">{totalEmisi} Ton CO₂</p>
            <p className="text-xs text-emerald-600 mt-2">Dikurangi</p>
          </div>

        </div>

        {/* Filter & Action Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari nama user atau komunitas..."
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

            {/* Date Range */}
            <div className="flex gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all outline-none text-sm"
                placeholder="Dari"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all outline-none text-sm"
                placeholder="Sampai"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedFilter === status
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status === "all" ? "Semua" : status}
                </button>
              ))}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 
                         rounded-xl font-medium transition-all text-sm"
            >
              <FiDownload size={16} />
              Export Data
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 
                         rounded-xl font-medium transition-all text-sm"
            >
              <FiPrinter size={16} />
              Print
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Table Title */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Tabel Donasi</h2>
            <p className="text-sm text-gray-600 mt-1">Daftar semua transaksi donasi yang masuk</p>
          </div>

          {/* Table Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
            <div className="grid grid-cols-12 gap-4 font-semibold text-sm">
              <div className="col-span-2">Nama User</div>
              <div className="col-span-3">Nominal Donasi</div>
              <div className="col-span-3">Komunitas Tujuan</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Tanggal Donasi</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredDonations.length === 0 ? (
              <div className="p-16 text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada data donasi</h3>
                <p className="text-gray-500">Data donasi akan muncul di sini</p>
              </div>
            ) : (
              filteredDonations.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-green-50 transition-colors items-center"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Nama User */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg 
                                    flex items-center justify-center font-semibold text-green-700">
                      {item.namaUser.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-800">{item.namaUser}</span>
                  </div>

                  {/* Nominal Donasi */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiDollarSign size={16} className="text-green-600" />
                      </div>
                      <span className="font-bold text-gray-800">{item.nominalDonasi}</span>
                    </div>
                  </div>

                  {/* Komunitas Tujuan */}
                  <div className="col-span-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium inline-flex items-center gap-1">
                      <FiUsers size={12} />
                      {item.komunitasTujuan}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Tanggal Donasi */}
                  <div className="col-span-2 text-gray-600 text-sm flex items-center gap-2">
                    <FiCalendar size={14} className="text-gray-400" />
                    {item.tanggalDonasi}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table Footer - Summary */}
          {filteredDonations.length > 0 && (
            <div className="bg-gray-50 p-4 border-t-2 border-green-500">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 font-bold text-gray-800">
                  Total:
                </div>
                <div className="col-span-3">
                  <span className="font-bold text-green-600 text-lg">
                    {formatCurrency(filteredDonations.reduce((sum, item) => sum + item.nominalValue, 0))}
                  </span>
                </div>
                <div className="col-span-7 text-right text-sm text-gray-600">
                  Menampilkan {filteredDonations.length} dari {donations.length} transaksi
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Top Donatur */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Top Donatur
            </h3>
            <div className="space-y-3">
              {donations
                .sort((a, b) => b.nominalValue - a.nominalValue)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.namaUser}</p>
                      <p className="text-sm text-gray-600">{item.nominalDonasi}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Komunitas Terpopuler */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              Komunitas Terpopuler
            </h3>
            <div className="space-y-3">
              {[...new Set(donations.map(d => d.komunitasTujuan))]
                .slice(0, 3)
                .map((komunitas, index) => {
                  const total = donations
                    .filter(d => d.komunitasTujuan === komunitas)
                    .reduce((sum, d) => sum + d.nominalValue, 0);
                  return (
                    <div key={komunitas} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiUsers className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{komunitas}</p>
                        <p className="text-sm text-gray-600">{formatCurrency(total)}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
    </div>
  );
}