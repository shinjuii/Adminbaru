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

const mainGreen = "#22C55E";   // green-500
const darkGreen = "#16A34A";   // green-600
const softGreen = "#DCFCE7";   // green-100

export default function DashboardHome() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalExpenses: 0,
    balance: 0,
    donorCount: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const formatRupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

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

  const fetchAllDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, donationsRes, expensesRes] = await Promise.all([
        axios.get("/api/dashboard-summary"),
        axios.get("/api/donations"),
        axios.get("/api/Pengeluaran"),
      ]);

      setStats({
        totalDonations: dashboardRes.data.totalDonations || 0,
        totalExpenses: dashboardRes.data.totalExpenses || 0,
        balance: dashboardRes.data.balance || 0,
        donorCount: dashboardRes.data.donorCount || 0,
      });

      if (donationsRes.data.length > 0) {
        setRecentDonations(
          donationsRes.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
        );
      }

      const expenses = expensesRes.data.data || expensesRes.data || [];
      if (expenses.length > 0) {
        setRecentExpenses(
          expenses
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
        );
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllDashboardData();
    setTimeout(() => setRefreshing(false), 800);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserName(user.name || "Admin");
    fetchAllDashboardData();
  }, []);

  const StatCard = ({ icon, title, value, isLoading }) => (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-green-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-1 bg-green-500"></div>
      <div className="p-4 flex items-center">
        <div className="p-3 rounded-full bg-green-100 mr-4">
          <FontAwesomeIcon icon={icon} className="text-green-600" size="lg" />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          {isLoading ? (
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <p className="font-bold text-gray-800 text-xl">{value}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const TransactionItem = ({ donation, isExpense }) => (
    <div className="flex items-center justify-between py-3 border-b border-green-100 hover:bg-green-50 rounded-lg px-2">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <FontAwesomeIcon
            icon={isExpense ? faMoneyBillWave : faUser}
            className="text-green-600"
          />
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {isExpense ? donation.nama_pengeluaran : donation.nama}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {formatDate(donation.created_at)}
          </div>
        </div>
      </div>

      <div className={isExpense ? "text-red-600" : "text-green-600"}>
        {isExpense
          ? `-${formatRupiah(donation.jumlah)}`
          : `+${formatRupiah(donation.jumlah)}`}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">

      <AppSidebar />

      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">
        <div className="p-6 space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Ringkasan aktivitas EcoTrack</p>
            </div>

            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm shadow"
            >
              <FontAwesomeIcon icon={faSync} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          <WelcomeCard userName={userName} />

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={faUser} title="Total User" value={stats.totalDonations} isLoading={loading} />
            <StatCard icon={faCloudMeatball} title="Total Emisi" value={stats.totalExpenses} isLoading={loading} />
            <StatCard icon={faMoneyBillWave} title="Total Donasi" value={stats.balance} isLoading={loading} />
            <StatCard icon={faUsers} title="Jumlah Komunitas" value={stats.donorCount} isLoading={loading} />
          </div>

          {/* CHART */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-green-200">
            <div
              className="p-4 text-white"
              style={{ background: `linear-gradient(120deg, ${mainGreen}, ${darkGreen})` }}
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
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <MonthlyReportChart />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
