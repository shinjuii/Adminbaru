import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque, faMoneyBillWave, faHandHoldingDollar, faBuilding,
  faChartLine, faCalendarAlt, faSync, faIdCard, faUser, faCloudMeatball, faUsers
} from "@fortawesome/free-solid-svg-icons";

import WelcomeCard from "../../../components/ecommerce/WelcomeCard";
import MonthlyReportChart from "../../../components/ecommerce/MonthlyReportChart";
import AppSidebar from "../../../layout/AppSidebar";

export default function DashboardHome() {
  const [userName, setUserName] = useState("Cleo");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDonations: 1250,
    totalExpenses: 850,
    balance: 25000000,
    donorCount: 48,
  });
  const [recentDonations, setRecentDonations] = useState([
    { id: 1, nama: "Budi Santoso", jumlah: 500000, created_at: new Date().toISOString() },
    { id: 2, nama: "Siti Aminah", jumlah: 750000, created_at: new Date().toISOString() },
    { id: 3, nama: "Ahmad Wijaya", jumlah: 300000, created_at: new Date().toISOString() },
  ]);
  const [recentExpenses, setRecentExpenses] = useState([
    { id: 1, nama_pengeluaran: "Anto", jumlah: 12.5, created_at: new Date().toISOString() },
    { id: 2, nama_pengeluaran: "Budi", jumlah: 7.2, created_at: new Date().toISOString() },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);

  const formatRupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    const formatEmisi = (value) =>
      `${value} kg CO₂`;

  const formatDate = (dateString) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(new Date(dateString));

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const StatCard = ({ icon, title, value, isLoading }) => (
    <div
      className="rounded-xl shadow-md overflow-hidden border transition-all duration-300 hover:shadow-lg"
      style={{ backgroundColor: '#F3F5F2', borderColor: '#3E5F44' }}
    >
      <div className="h-1" style={{ backgroundColor: '#3E5F44' }}></div>
      <div className="p-4 flex items-center">
        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#BCA88D' }}>
          <FontAwesomeIcon icon={icon} style={{ color: '#3E5F44' }} size="lg" />
        </div>
        <div>
          <h3 className="text-sm" style={{ color: '#5C6D5D' }}>{title}</h3>
          {isLoading ? (
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <p className="font-bold text-xl" style={{ color: '#1E1E1E' }}>{value}</p>
          )}
        </div>
      </div>
    </div>
  );

  const TransactionItem = ({ donation, isExpense }) => (
    <div 
      className="flex items-center justify-between py-3 border-b rounded-lg px-2 transition-colors"
      style={{ borderColor: 'rgba(62, 95, 68, 0.2)' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(188, 168, 141, 0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
             style={{ backgroundColor: '#BCA88D' }}>
          <FontAwesomeIcon
            icon={isExpense ? faCloudMeatball : faUser}
            style={{ color: '#3E5F44' }}
          />
        </div>
        <div>
          <p className="font-medium" style={{ color: '#1E1E1E' }}>
            {isExpense ? donation.nama_pengeluaran : donation.nama}
          </p>
          <div className="flex items-center text-xs" style={{ color: '#5C6D5D' }}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {formatDate(donation.created_at)}
          </div>
        </div>
      </div>

    <div style={{ color: isExpense ? '#3E5F44' : '#3E5F44', fontWeight: '600' }}>
     {isExpense
    ? `${formatEmisi(donation.jumlah)}`
    : `+${formatRupiah(donation.jumlah)}`}
</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">

      <AppSidebar />

      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">
        <div className="p-6 space-y-6">


          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>Dashboard</h1>
              <p className="text-sm" style={{ color: '#5C6D5D' }}>Ringkasan aktivitas EcoTrack</p>
            </div>

            <button
              onClick={handleRefresh}
              className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: '#3E5F44', 
                color: '#F3F5F2',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6C8C73'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3E5F44'}
            >
              <FontAwesomeIcon icon={faSync} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* WELCOME CARD */}
          <div 
            className="rounded-xl shadow-lg p-6 border"
            style={{
              background: 'linear-gradient(135deg, #3E5F44 0%, #6C8C73 100%)',
              borderColor: '#3E5F44'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Selamat Datang, {userName}! 
            </h2>
            <p className="text-white/90">
              Semoga hari Anda menyenangkan. Mari kelola data dengan bijak!
            </p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={faUser} title="Total User" value={stats.totalDonations} isLoading={loading} />
            <StatCard icon={faCloudMeatball} title="Total Emisi" value={stats.totalExpenses} isLoading={loading} />
            <StatCard icon={faMoneyBillWave} title="Total Donasi" value={formatRupiah(stats.balance)} isLoading={loading} />
            <StatCard icon={faUsers} title="Jumlah Komunitas" value={stats.donorCount} isLoading={loading} />
          </div>

          {/* CHART */}
          <div 
            className="shadow-md rounded-xl overflow-hidden border"
            style={{ backgroundColor: '#F3F5F2', borderColor: 'rgba(62, 95, 68, 0.3)' }}
          >
            <div 
              className="p-4 text-white"
              style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
            >
              <h3 className="text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                Grafik Emisi dan Donasi Komunitas
              </h3>
              <p className="text-white/80 text-sm">Visualisasi aktivitas emisi & donasi</p>
            </div>

            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-80">
                  <div 
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                    style={{ borderColor: '#3E5F44' }}
                  ></div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center" style={{ color: '#5C6D5D' }}>
                  <div className="text-center">
                    <FontAwesomeIcon icon={faChartLine} size="3x" style={{ color: '#BCA88D' }} className="mb-4" />
                    <p className="text-lg font-semibold" style={{ color: '#1E1E1E' }}>Grafik Statistik</p>
                    <p className="text-sm">Data akan ditampilkan di sini</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Donations */}
            <div 
              className="rounded-xl shadow-md overflow-hidden border"
              style={{ backgroundColor: '#F3F5F2', borderColor: 'rgba(62, 95, 68, 0.3)' }}
            >
              <div 
                className="p-4 text-white"
                style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
              >
                <h3 className="text-lg font-semibold flex items-center">
                  <FontAwesomeIcon icon={faHandHoldingDollar} className="mr-2" />
                  Donasi Terbaru
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {recentDonations.map((donation) => (
                  <TransactionItem key={donation.id} donation={donation} isExpense={false} />
                ))}
              </div>
            </div>

            {/* Recent Expenses */}
            <div 
              className="rounded-xl shadow-md overflow-hidden border"
              style={{ backgroundColor: '#F3F5F2', borderColor: 'rgba(62, 95, 68, 0.3)' }}
            >
              <div 
                className="p-4 text-white"
                style={{ background: 'linear-gradient(to right, #6C8C73, #3E5F44)' }}
              >
                <h3 className="text-lg font-semibold flex items-center">
                  <FontAwesomeIcon icon={faCloudMeatball} className="mr-2" />
                  Emisi Terbaru
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {recentExpenses.map((expense) => (
                  <TransactionItem key={expense.id} donation={expense} isExpense={true} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>

   
  );
}