import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque, faMoneyBillWave, faHandHoldingDollar, faBuilding,
  faMapMarkerAlt, faUsers, faChartLine, faCalendarAlt,
  faSync, faIdCard, faUser, faCloudMeatball, faHandHoldingHeart
} from "@fortawesome/free-solid-svg-icons";

import WelcomeCard from "../../../components/ecommerce/WelcomeCard";
import MonthlyReportChart from "../../../components/ecommerce/MonthlyReportChart";
import AppSidebar from "../../../layout/AppSidebar";
import { getDashboardStats, getRecentActivities, getMonthlyTrends } from "../../../config/supabase";

export default function DashboardHome() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [stats, setStats] = useState({
    total_users: 0,
    total_communities: 0,
    total_trips: 0,
    total_donations: 0,
    total_donation_amount: 0,
    total_emissions: 0,
    total_emissions_offset: 0,
    recent_users: 0,
    recent_donations: 0,
    pending_donations: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Admin");
  const [refreshing, setRefreshing] = useState(false);

  // ============================================
  // SUPABASE DATA FETCHING
  // ============================================

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard statistics from Supabase
      const { data: statsData, error: statsError } = await getDashboardStats();
      if (statsError) throw new Error(statsError);
      if (statsData) {
        console.log('Dashboard Stats:', statsData);
        setStats(statsData);
      }

      // Fetch recent donation activities from Supabase
      const { data: activitiesData, error: activitiesError } = await getRecentActivities(5);
      if (activitiesError) throw new Error(activitiesError);
      if (activitiesData) {
        console.log('Recent Activities:', activitiesData);
        setRecentActivities(activitiesData);
      }

      // Fetch monthly donation trends from Supabase
      const { data: trendsData, error: trendsError } = await getMonthlyTrends(6);
      if (trendsError) throw new Error(trendsError);
      if (trendsData) {
        console.log('Monthly Trends:', trendsData);
        setMonthlyData(trendsData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

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
    await fetchAllData();
    setTimeout(() => setRefreshing(false), 800);
  };

  // ============================================
  // UI COMPONENTS
  // ============================================

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

  const TransactionItem = ({ activity }) => (
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
            icon={faUser}
            style={{ color: '#3E5F44' }}
          />
        </div>
        <div>
          <p className="font-medium" style={{ color: '#1E1E1E' }}>
            {activity.user_name}
          </p>
          <div className="flex items-center text-xs" style={{ color: '#5C6D5D' }}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {formatDate(activity.created_at)}
          </div>
        </div>
      </div>

      <div style={{ color: '#3E5F44', fontWeight: '600' }}>
        +{formatRupiah(activity.amount)}
      </div>
    </div>
  );

  // ============================================
  // RENDER UI
  // ============================================

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

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

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

          {/* STAT CARDS - SUPABASE DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={faUser}
              title="Total User"
              value={stats.total_users || 0}
              isLoading={loading}
            />
            <StatCard
              icon={faCloudMeatball}
              title="Total Emisi"
              value={`${(stats.total_emissions || 0).toLocaleString('id-ID')} kg`}
              isLoading={loading}
            />
            <StatCard
              icon={faMoneyBillWave}
              title="Total Donasi"
              value={formatRupiah(stats.total_donation_amount || 0)}
              isLoading={loading}
            />
            <StatCard
              icon={faUsers}
              title="Jumlah Komunitas"
              value={stats.total_communities || 0}
              isLoading={loading}
            />
          </div>

          {/* CHART PLACEHOLDER */}
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
                    <p className="text-sm">
                      {monthlyData.length > 0
                        ? `${monthlyData.length} bulan data tersedia`
                        : 'Data akan ditampilkan di sini'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RECENT TRANSACTIONS - SUPABASE DATA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Donations from Supabase */}
            <div
              className="rounded-xl shadow-md overflow-hidden border"
              style={{ backgroundColor: '#F3F5F2', borderColor: 'rgba(62, 95, 68, 0.3)' }}
            >
              <div
                className="p-4 text-white"
                style={{ background: 'linear-gradient(to right, #3E5F44, #6C8C73)' }}
              >
                <h3 className="text-lg font-semibold flex items-center">
                  <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
                  Donasi Terbaru
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mx-auto" style={{ borderColor: '#3E5F44' }}></div>
                    <p className="mt-2 text-sm" style={{ color: '#5C6D5D' }}>Loading...</p>
                  </div>
                ) : recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <TransactionItem key={activity.id} activity={activity} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Belum ada donasi terbaru</p>
                    <p className="text-xs mt-1">Data akan muncul setelah ada donasi</p>
                  </div>
                )}
              </div>
            </div>

            {/* System Statistics from Supabase */}
            <div
              className="rounded-xl shadow-md overflow-hidden border"
              style={{ backgroundColor: '#F3F5F2', borderColor: 'rgba(62, 95, 68, 0.3)' }}
            >
              <div
                className="p-4 text-white"
                style={{ background: 'linear-gradient(to right, #6C8C73, #3E5F44)' }}
              >
                <h3 className="text-lg font-semibold flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                  Statistik Sistem
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mx-auto" style={{ borderColor: '#3E5F44' }}></div>
                    <p className="mt-2 text-sm" style={{ color: '#5C6D5D' }}>Loading...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(62, 95, 68, 0.2)' }}>
                      <span style={{ color: '#5C6D5D' }}>Total Trips</span>
                      <span className="font-semibold" style={{ color: '#1E1E1E' }}>{stats.total_trips || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(62, 95, 68, 0.2)' }}>
                      <span style={{ color: '#5C6D5D' }}>Emisi Offset</span>
                      <span className="font-semibold" style={{ color: '#1E1E1E' }}>{(stats.total_emissions_offset || 0).toLocaleString('id-ID')} kg</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(62, 95, 68, 0.2)' }}>
                      <span style={{ color: '#5C6D5D' }}>Donasi Sukses</span>
                      <span className="font-semibold" style={{ color: '#1E1E1E' }}>{stats.total_donations || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span style={{ color: '#5C6D5D' }}>User Baru (30 hari)</span>
                      <span className="font-semibold" style={{ color: '#1E1E1E' }}>{stats.recent_users || 0}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}