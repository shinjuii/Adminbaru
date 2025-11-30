import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiCamera, FiEdit2, FiSave, FiX, FiShield, FiActivity, FiClock, FiMapPin } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    nama: "Cleo",
    email: "Ibra@Gmail.com",
    status: "EcoTrack Admin",
    phone: "+62 812-3456-7890",
    location: "Batam, Indonesia",
    joinDate: "30 Nov 2025"
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">

      {/* ==== SIDEBAR ==== */}
      <AppSidebar />

      {/* ==== CONTENT WRAPPER (GESER KANAN) ==== */}
      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">

        {/* ==== PADDING dalam konten ==== */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl shadow-2xl overflow-hidden mb-8 animate-fadeIn">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FiUser size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-3 bg-white rounded-full shadow-lg cursor-pointer 
                                hover:bg-gray-50 transition-all group-hover:scale-110 duration-300">
                  <FiCamera size={20} className="text-green-600" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{formData.nama}</h1>
                <p className="text-white/90 text-lg mb-4">{formData.status}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                      >
                        <FiEdit2 size={18} />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl hover:bg-green-700 transition-all flex items-center gap-2 hover:scale-105"
                      >
                        <FiLock size={18} />
                        Ganti Password
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                      >
                        <FiSave size={18} />
                        Simpan
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl hover:bg-red-600 transition-all flex items-center gap-2 hover:scale-105"
                      >
                        <FiX size={18} />
                        Batal
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiActivity size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status Akun</p>
                <p className="font-semibold text-gray-800">Aktif</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiClock size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bergabung</p>
                <p className="font-semibold text-gray-800">{formData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiShield size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-semibold text-gray-800">Admin</p>
              </div>
            </div>
          </div>

        </div>

        {/* Informasi Akun Section */}
        <div className="bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-3xl p-8 shadow-xl border border-green-200">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Akun</h2>

          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-5">
            
            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiUser size={20} />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <div className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-green-100 to-emerald-100 
                                  rounded-xl text-gray-800 font-medium">
                    {formData.nama}
                  </div>
                )}
              </div>
            </div>

            {/* Kontak/Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kontak</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiMail size={20} />
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <div className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-green-100 to-emerald-100 
                                  rounded-xl text-gray-800 font-medium">
                    {formData.email}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiShield size={20} />
                </div>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  >
                    <option>EcoTrack Admin</option>
                  </select>
                ) : (
                  <div className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-green-100 to-emerald-100 
                                  rounded-xl text-gray-800 font-medium">
                    {formData.status}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info - Only show when editing */}
            {isEditing && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FiMapPin size={20} />
                    </div>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                                 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 
                        animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform animate-slideUp">
            
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Ganti Password</h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              {/* Current Password */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password Lama</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiLock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Masukkan password lama"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiLock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiLock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl 
                             font-medium transition-all"
                >
                  Batal
                </button>

                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                                   hover:from-green-600 hover:to-green-700 text-white rounded-xl 
                                   font-medium shadow-lg hover:shadow-xl transition-all">
                  Simpan
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
  );
}