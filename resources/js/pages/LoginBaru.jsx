import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginBaru = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Remember Me:", remember);
  
      // Simpan token dummy
      localStorage.setItem("token", "dummy_token");
  
      // Redirect ke dashboard admin
      navigate("/dashboard-admin");
  
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('../img/bg-repeat.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

      {/* Overlay */}
      <div className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(62, 95, 68, 0.8))`,
        }}></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}>

          {/* Left Image */}
          <motion.div
            className="relative md:w-2/5 flex flex-col"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url('/img/daun.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>

            <div className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to bottom right, rgba(108, 140, 115, 0.6), rgba(62, 95, 68, 0.5))`
              }}></div>

            <div className="relative flex flex-col justify-evenly h-full py-10 px-4 text-white z-10">
              <div className="flex justify-center items-center">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <img
                    src="../img/ecotrack.jpg"
                    alt="Logo"
                    className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-full"
                  />
                </div>
              </div>

              <div className="text-center mt-8 mb-6">
                <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2>
                <p className="text-sm md:text-base opacity-90">
                  Sistem Informasi EcoTrack
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="p-8 md:w-3/5 md:p-10"
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="max-w-md mx-auto">

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>Masuk ke Akun Anda</h1>
              </div>

              {/* Form Login */}
              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="block font-medium mb-1" style={{ color: '#1E1E1E' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 transition-all outline-none"
                    style={{
                      borderColor: '#e5e7eb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3E5F44';
                      e.target.style.boxShadow = '0 0 0 3px rgba(62, 95, 68, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1" style={{ color: '#1E1E1E' }}>Kata Sandi</label>
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 transition-all outline-none"
                    style={{
                      borderColor: '#e5e7eb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3E5F44';
                      e.target.style.boxShadow = '0 0 0 3px rgba(62, 95, 68, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4"
                      style={{ 
                        accentColor: '#3E5F44'
                      }}
                    />
                    <span style={{ color: '#1E1E1E' }}>Ingat Saya</span>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white font-semibold rounded-lg py-3 w-full transition"
                  style={{ 
                    background: 'linear-gradient(to right, #3E5F44, #6C8C73)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(to right, #2d4533, #57735e)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(to right, #3E5F44, #6C8C73)';
                  }}>
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>

              <div className="mt-8 text-center text-xs" style={{ color: '#5C6D5D' }}>
                <p>&copy; 2025 EcoTrack. All rights reserved.</p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginBaru;