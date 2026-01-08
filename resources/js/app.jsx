import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "../css/app.css";

// ===== Context =====
import { SidebarProvider } from "./context/SidebarContext";

// ===== Pages =====
import LoginBaru from "./pages/LoginBaru";
import DashboardHome from "./pages/dashboard/DashboardAdmin/DashboardHome";
import FaktorEmisi from "./pages/dashboard/DashboardAdmin/FaktorEmisi";
import Komunitas from "./pages/dashboard/DashboardAdmin/Komunitas";
import Edukasi from "./pages/dashboard/DashboardAdmin/Edukasi";
import Notifikasi from "./pages/dashboard/DashboardAdmin/Notifikasi";
import CatatanDonasiOffset from "./pages/dashboard/DashboardAdmin/CatatanDonasiOffset";
import Profile from "./pages/dashboard/DashboardAdmin/ProfileAdmin";

// ===== Private Route (Frontend Only) =====
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/loginbaru" replace />;
    }

    return children;
};

// ===== App Routes =====
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/loginbaru" element={<LoginBaru />} />

            <Route
                path="/dashboard-admin"
                element={
                    <PrivateRoute>
                        <DashboardHome />
                    </PrivateRoute>
                }
            />

            <Route
                path="/faktor-emisi"
                element={
                    <PrivateRoute>
                        <FaktorEmisi />
                    </PrivateRoute>
                }
            />

            <Route
                path="/komunitas"
                element={
                    <PrivateRoute>
                        <Komunitas />
                    </PrivateRoute>
                }
            />

            <Route
                path="/edukasi"
                element={
                    <PrivateRoute>
                        <Edukasi />
                    </PrivateRoute>
                }
            />

            <Route
                path="/notifikasi"
                element={
                    <PrivateRoute>
                        <Notifikasi />
                    </PrivateRoute>
                }
            />
            <Route
                path="/laporan-emisi"
                element={
                    <PrivateRoute>
                        <CatatanDonasiOffset />
                    </PrivateRoute>
                }

            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }

            />
            {/* FIX BAGIAN INI */}
            <Route path="/" element={<Navigate to="/dashboard-admin" replace />} />
            <Route path="*" element={<Navigate to="/dashboard-admin" replace />} />
        </Routes>
    );
};

// ===== Main App =====
const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                { }
                <SidebarProvider>
                    <AppRoutes />
                </SidebarProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
