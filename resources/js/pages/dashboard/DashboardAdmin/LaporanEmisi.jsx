import React, { useState, useEffect } from "react";
import { FiDownload, FiFilter, FiBriefcase, FiUsers, FiTrendingUp, FiCalendar, FiSearch, FiX, FiEye, FiPrinter } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { getDonationReports, getDashboardStats } from "../../../config/supabase";

export default function LaporanDonasi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonasi: 0,
    jumlahKomunitas: 0,
    totalEmisi: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch Stats
      const { data: dashboardStats } = await getDashboardStats();

      // Fetch Donations List
      const { data: donationData, error } = await getDonationReports();
      if (error) throw error;

      // Transform Data
      const transformed = donationData.map(d => ({
        id: d.id,
        namaUser: d.users?.full_name || "Guest",
        nominalDonasi: formatCurrency(d.amount),
        nominalValue: d.amount,
        komunitasTujuan: d.communities?.name || "Unknown",
        status: d.payment_status === 'success' ? 'Sukses' : d.payment_status === 'pending' ? 'Pending' : 'Gagal',
        tanggalDonasi: new Date(d.created_at).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'short', year: 'numeric'
        }),
        rawDate: new Date(d.created_at) // For date filtering
      }));

      setDonations(transformed);

      // Update Stats
      if (dashboardStats) {
        setStats({
          totalDonasi: dashboardStats.total_donation_amount || 0,
          jumlahKomunitas: dashboardStats.total_communities || 0,
          totalEmisi: dashboardStats.total_emissions_offset || 0
        });
      }

    } catch (err) {
      console.error("Error fetching report data:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ["all", "Sukses", "Pending", "Gagal"];

  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.namaUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.komunitasTujuan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedFilter === "all" || item.status === selectedFilter;

    // Date Filtering
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const itemDate = item.rawDate;
      const start = dateFrom ? new Date(dateFrom) : new Date('1970-01-01');
      const end = dateTo ? new Date(dateTo) : new Date();
      // Set end date to end of day
      end.setHours(23, 59, 59, 999);
      matchesDate = itemDate >= start && itemDate <= end;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sukses": return "text-green-700";
      case "Pending": return "text-yellow-700";
      case "Gagal": return "text-red-700";
      default: return "text-gray-700";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Sukses": return "#e8f0e9";
      case "Pending": return "#fef3c7";
      case "Gagal": return "#fee2e2";
      default: return "#f3f4f6";
    }
  };

  const handleExport = () => {
    // Simple CSV Export
    const headers = ["Nama User", "Nominal", "Komunitas", "Status", "Tanggal"];
    const rows = filteredDonations.map(d => [
      d.namaUser, d.nominalValue, d.komunitasTujuan, d.status, d.tanggalDonasi
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan_donasi.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handlePrint = () => {
    window.print();
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
                Laporan Donasi
              </h1>
              <p style={{ color: '#5C6D5D' }}>Ringkasan dan detail semua transaksi donasi</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* Total Donasi */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #3E5F44, #6C8C73)' }}>
                    <span className="text-xl font-bold font-sans">Rp</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}>Total</span>
                </div>
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium mb-1">Total Donasi</p>
                <p className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                  {formatCurrency(stats.totalDonasi).replace('Rp', 'RP')}
                </p>
                <p className="text-xs mt-2" style={{ color: '#3E5F44' }}>Seluruh masa</p>
              </div>

              {/* Jumlah Komunitas */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
                    <FiUsers size={28} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}>Komunitas</span>
                </div>
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium mb-1">Jumlah Komunitas</p>
                <p className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>{stats.jumlahKomunitas}</p>
                <p className="text-xs mt-2" style={{ color: '#6C8C73' }}>Penerima aktif</p>
              </div>

              {/* Total Emisi */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 
                          transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-xl text-white 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(to bottom right, #BCA88D, #9a8a75)' }}>
                    <FiTrendingUp size={28} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#F3F5F2', color: '#5C6D5D' }}>Dampak</span>
                </div>
                <p style={{ color: '#5C6D5D' }} className="text-sm font-medium mb-1">Total Emisi Offset</p>
                <p className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>{(stats.totalEmisi).toLocaleString('id-ID')} kg CO₂</p>
                <p className="text-xs mt-2" style={{ color: '#BCA88D' }}>Dikurangi</p>
              </div>

            </div>

            {/* Filter & Action Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">

                {/* Search Input */}
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: '#5C6D5D' }} size={20} />
                  <input
                    type="text"
                    placeholder="Cari nama user atau komunitas..."
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

                {/* Date Range */}
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="px-4 py-3 border rounded-xl transition-all outline-none text-sm"
                    style={{ borderColor: '#BCA88D' }}
                    onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                    onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                    placeholder="Dari"
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="px-4 py-3 border rounded-xl transition-all outline-none text-sm"
                    style={{ borderColor: '#BCA88D' }}
                    onFocus={(e) => e.target.style.borderColor = '#3E5F44'}
                    onBlur={(e) => e.target.style.borderColor = '#BCA88D'}
                    placeholder="Sampai"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedFilter(status)}
                      className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300"
                      style={selectedFilter === status ? {
                        background: 'linear-gradient(to right, #3E5F44, #6C8C73)',
                        color: 'white',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      } : {
                        backgroundColor: '#F3F5F2',
                        color: '#5C6D5D'
                      }}
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm"
                  style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}
                >
                  <FiDownload size={16} />
                  Export CSV
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm"
                  style={{ backgroundColor: 'rgba(108, 140, 115, 0.2)', color: '#6C8C73' }}
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
                <h2 className="text-xl font-bold" style={{ color: '#1E1E1E' }}>Tabel Donasi</h2>
                <p className="text-sm mt-1" style={{ color: '#5C6D5D' }}>Daftar semua transaksi donasi yang masuk</p>
              </div>

              {/* Table Header */}
              <div className="text-white p-4"
                style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
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
                {loading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
                    <p className="mt-2 text-gray-500">Memuat data...</p>
                  </div>
                ) : filteredDonations.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada data donasi</h3>
                    <p style={{ color: '#5C6D5D' }}>Data donasi akan muncul di sini</p>
                  </div>
                ) : (
                  filteredDonations.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 p-4 transition-colors items-center"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(62, 95, 68, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Nama User */}
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold"
                          style={{
                            background: 'linear-gradient(to bottom right, rgba(62, 95, 68, 0.2), rgba(108, 140, 115, 0.2))',
                            color: '#3E5F44'
                          }}>
                          {item.namaUser.charAt(0)}
                        </div>
                        <span className="font-semibold" style={{ color: '#1E1E1E' }}>{item.namaUser}</span>
                      </div>

                      {/* Nominal Donasi */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: '#e8f0e9' }}>
                            <span className="font-bold text-sm">Rp</span>
                          </div>
                          <span className="font-bold" style={{ color: '#1E1E1E' }}>{item.nominalDonasi}</span>
                        </div>
                      </div>

                      {/* Komunitas Tujuan */}
                      <div className="col-span-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1"
                          style={{ backgroundColor: 'rgba(108, 140, 115, 0.2)', color: '#6C8C73' }}>
                          <FiUsers size={12} />
                          {item.komunitasTujuan}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                          style={{ backgroundColor: getStatusBg(item.status) }}>
                          {item.status}
                        </span>
                      </div>

                      {/* Tanggal Donasi */}
                      <div className="col-span-2 text-sm flex items-center gap-2" style={{ color: '#5C6D5D' }}>
                        <FiCalendar size={14} />
                        {item.tanggalDonasi}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Table Footer - Summary */}
              {filteredDonations.length > 0 && (
                <div className="p-4 border-t-2"
                  style={{ backgroundColor: '#F3F5F2', borderColor: '#3E5F44' }}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 font-bold" style={{ color: '#1E1E1E' }}>
                      Total:
                    </div>
                    <div className="col-span-3">
                      <span className="font-bold text-lg" style={{ color: '#3E5F44' }}>
                        {formatCurrency(filteredDonations.reduce((sum, item) => sum + item.nominalValue, 0))}
                      </span>
                    </div>
                    <div className="col-span-7 text-right text-sm" style={{ color: '#5C6D5D' }}>
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
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1E1E1E' }}>
                  <span className="text-2xl">🏆</span>
                  Top Donatur
                </h3>
                <div className="space-y-3">
                  {donations
                    .sort((a, b) => b.nominalValue - a.nominalValue)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: '#F3F5F2' }}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold" style={{ color: '#1E1E1E' }}>{item.namaUser}</p>
                          <p className="text-sm" style={{ color: '#5C6D5D' }}>{item.nominalDonasi}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Komunitas Terpopuler */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1E1E1E' }}>
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
                        <div key={komunitas} className="flex items-center gap-3 p-3 rounded-xl"
                          style={{ backgroundColor: '#F3F5F2' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#e8f0e9' }}>
                            <FiUsers style={{ color: '#3E5F44' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold" style={{ color: '#1E1E1E' }}>{komunitas}</p>
                            <p className="text-sm" style={{ color: '#5C6D5D' }}>{formatCurrency(total)}</p>
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
    </div>
  );
}