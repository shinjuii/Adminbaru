import React, { useState, useEffect } from "react";
import { FiDownload, FiFilter, FiBriefcase, FiUsers, FiTrendingUp, FiCalendar, FiSearch, FiX, FiEye, FiPrinter, FiRefreshCw } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { supabase } from "../../../config/supabase";

export default function CatatanDonasiOffset() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch donations from Supabase
    const fetchDonations = async () => {
        try {
            setLoading(true);
            setError(null);

            // Query the view that joins donations, users, and communities
            const { data, error } = await supabase
                .from('vw_donation_offset_admin')
                .select('*')
                .order('tanggal_donasi', { ascending: false });

            if (error) throw error;

            // Transform data to match the component structure (already in correct format from view)
            const transformedData = data.map(item => ({
                id: item.id,
                namaUser: item.nama_donor,
                nominalDonasi: `Rp ${item.nominal_donasi.toLocaleString('id-ID')}`,
                nominalValue: item.nominal_donasi,
                offsetAmount: item.jumlah_offset_ton,
                komunitasTujuan: item.komunitas_tujuan,
                status: item.status, // Already mapped: 'Sukses', 'Pending', 'Gagal'
                tanggalDonasi: new Date(item.tanggal_donasi).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                catatan: item.catatan
            }));

            setDonations(transformedData);
        } catch (error) {
            console.error('Error fetching donations:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const statusOptions = ["all", "Sukses", "Pending", "Gagal"];

    const filteredDonations = donations.filter(item => {
        const matchesSearch = item.namaUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.komunitasTujuan.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedFilter === "all" || item.status === selectedFilter;
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const totalDonasi = donations.reduce((sum, item) => sum + item.nominalValue, 0);
    const totalOffset = donations.reduce((sum, item) => sum + item.offsetAmount, 0);
    const jumlahKomunitas = [...new Set(donations.map(item => item.komunitasTujuan))].length;

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
        alert("Export data ke Excel/PDF");
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
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2" style={{
                                        background: 'linear-gradient(to right, #3E5F44, #6C8C73)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        Catatan Donasi Offset
                                    </h1>
                                    <p style={{ color: '#5C6D5D' }}>Ringkasan dan detail semua donasi offset karbon CO₂</p>
                                </div>
                                <button
                                    onClick={fetchDonations}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm"
                                    style={{ backgroundColor: '#e8f0e9', color: '#3E5F44' }}
                                >
                                    <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                                <p className="text-red-700 font-medium">⚠️ Error: {error}</p>
                                <button
                                    onClick={fetchDonations}
                                    className="mt-2 text-sm text-red-600 underline"
                                >
                                    Coba lagi
                                </button>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="text-center">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#3E5F44] mb-4"></div>
                                    <p style={{ color: '#5C6D5D' }}>Memuat data...</p>
                                </div>
                            </div>
                        )}

                        {/* Statistics Cards */}
                        {!loading && (
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
                                        {formatCurrency(totalDonasi).replace('Rp', 'RP')}
                                    </p>
                                    <p className="text-xs mt-2" style={{ color: '#3E5F44' }}>Donasi offset karbon</p>
                                </div>

                                {/* Total Offset CO2 */}
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
                                    <p style={{ color: '#5C6D5D' }} className="text-sm font-medium mb-1">Total Offset CO₂</p>
                                    <p className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>{totalOffset.toLocaleString('id-ID')} kg</p>
                                    <p className="text-xs mt-2" style={{ color: '#BCA88D' }}>Karbon dinetralkan</p>
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
                                    <p className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>{jumlahKomunitas}</p>
                                    <p className="text-xs mt-2" style={{ color: '#6C8C73' }}>Penerima aktif</p>
                                </div>

                            </div>
                        )}

                        {/* Filter & Action Bar */}
                        {!loading && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                                <div className="flex flex-col lg:flex-row gap-4">

                                    {/* Search Input */}
                                    <div className="flex-1 relative">
                                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2"
                                            style={{ color: '#5C6D5D' }} size={20} />
                                        <input
                                            type="text"
                                            placeholder="Cari nama donor atau komunitas..."
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
                                        Export Data
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
                        )}

                        {/* Table Section */}
                        {!loading && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

                                {/* Table Title */}
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold" style={{ color: '#1E1E1E' }}>Tabel Donasi Offset</h2>
                                    <p className="text-sm mt-1" style={{ color: '#5C6D5D' }}>Daftar semua transaksi donasi offset karbon yang masuk</p>
                                </div>

                                {/* Table Header */}
                                <div className="text-white p-4"
                                    style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}>
                                    <div className="grid grid-cols-12 gap-4 font-semibold text-sm">
                                        <div className="col-span-2">Nama Donor</div>
                                        <div className="col-span-2">Offset CO₂ (kg)</div>
                                        <div className="col-span-2">Nominal Donasi</div>
                                        <div className="col-span-2">Komunitas Tujuan</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2">Tanggal Donasi</div>
                                    </div>
                                </div>

                                {/* Table Body */}
                                <div className="divide-y divide-gray-100">
                                    {filteredDonations.length === 0 ? (
                                        <div className="p-16 text-center">
                                            <div className="text-6xl mb-4">🌱</div>
                                            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E1E1E' }}>Belum ada data donasi offset</h3>
                                            <p style={{ color: '#5C6D5D' }}>Data donasi offset akan muncul di sini</p>
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
                                                {/* Nama Donor */}
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

                                                {/* Offset CO2 */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(188, 168, 141, 0.2)' }}>
                                                            <FiTrendingUp size={16} style={{ color: '#BCA88D' }} />
                                                        </div>
                                                        <span className="font-bold" style={{ color: '#1E1E1E' }}>{item.offsetAmount} kg</span>
                                                    </div>
                                                </div>

                                                {/* Nominal Donasi */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 rounded-lg" style={{ backgroundColor: '#e8f0e9' }}>
                                                            <span className="font-bold text-sm">Rp</span>
                                                        </div>
                                                        <span className="font-bold" style={{ color: '#1E1E1E' }}>{item.nominalDonasi}</span>
                                                    </div>
                                                </div>

                                                {/* Komunitas Tujuan */}
                                                <div className="col-span-2">
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
                                            <div className="col-span-2">
                                                <span className="font-bold text-lg" style={{ color: '#BCA88D' }}>
                                                    {filteredDonations.reduce((sum, item) => sum + item.offsetAmount, 0).toLocaleString('id-ID')} kg CO₂
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="font-bold text-lg" style={{ color: '#3E5F44' }}>
                                                    {formatCurrency(filteredDonations.reduce((sum, item) => sum + item.nominalValue, 0))}
                                                </span>
                                            </div>
                                            <div className="col-span-6 text-right text-sm" style={{ color: '#5C6D5D' }}>
                                                Menampilkan {filteredDonations.length} dari {donations.length} transaksi
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Summary Cards */}
                        {!loading && donations.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                                {/* Top Donor */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1E1E1E' }}>
                                        <span className="text-2xl">🏆</span>
                                        Top Donor Offset
                                    </h3>
                                    <div className="space-y-3">
                                        {donations
                                            .sort((a, b) => b.offsetAmount - a.offsetAmount)
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
                                                        <p className="text-sm" style={{ color: '#5C6D5D' }}>{item.offsetAmount} kg CO₂</p>
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
                        )}

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
