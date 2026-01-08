import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiCamera, FiEdit2, FiSave, FiX, FiShield, FiActivity, FiClock, FiMapPin } from "react-icons/fi";
import AppSidebar from "../../../layout/AppSidebar";
import { getAdminProfile, updateAdminProfile, uploadImage } from "../../../config/supabase";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [userProfile, setUserProfile] = useState(null); // Full user object

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    status: "EcoTrack Admin",
    phone: "",
    location: "",
    joinDate: "",
    profile_photo_url: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAdminProfile();
      if (error) throw error;

      if (data) {
        setUserProfile(data);
        setFormData({
          nama: data.full_name || "",
          email: data.email || "",
          status: data.role === 'admin' ? "EcoTrack Admin" : "User",
          phone: data.admin_profile?.phone_number || "", // Adjusted to check nested profile or root if changed
          location: data.city ? `${data.city}, ${data.province || ''}` : "",
          joinDate: new Date(data.created_at).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
          }),
          profile_photo_url: data.profile_photo_url
        });
        setProfileImage(data.profile_photo_url);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && userProfile) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => setProfileImage(reader.result);
        reader.readAsDataURL(file);

        const path = `avatars/${userProfile.user_id}_${Date.now()}_${file.name}`;
        const { data, error } = await uploadImage('community-images', path, file); // Using community-images as placeholder bucket

        if (error) throw error;

        if (data?.publicUrl) {
          setFormData(prev => ({ ...prev, profile_photo_url: data.publicUrl }));
          // Also auto-save the profile photo URL
          await updateAdminProfile(userProfile.user_id, { profile_photo_url: data.publicUrl });
        }
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Gagal upload gambar profile");
      }
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      const parts = formData.location.split(',');
      const city = parts[0]?.trim();
      const province = parts[1]?.trim();

      const updates = {
        full_name: formData.nama,
        city: city,
        province: province
      };

      const { error } = await updateAdminProfile(userProfile.user_id, updates);
      if (error) throw error;

      setIsEditing(false);
      alert("Profile berhasil disimpan! ✅");
      fetchProfile(); // Refresh
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Gagal menyimpan profile: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); // Reset to original
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F5F2]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#3E5F44]"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F5F2' }}>

      {/* ==== SIDEBAR ==== */}
      <AppSidebar />

      {/* ==== CONTENT WRAPPER (GESER KANAN) ==== */}
      <div className="flex-1 ml-[90px] lg:ml-[290px] transition-all duration-300">

        {/* ==== PADDING dalam konten ==== */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">

          {/* Profile Header Card */}
          <div className="rounded-3xl shadow-2xl overflow-hidden mb-8 animate-fadeIn"
            style={{ background: 'linear-gradient(to bottom right, #6C8C73, #3E5F44)' }}>
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">

                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(to bottom right, #F3F5F2, #BCA88D)' }}>
                        <FiUser size={48} style={{ color: '#5C6D5D' }} />
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-3 bg-white rounded-full shadow-lg cursor-pointer 
                                hover:bg-gray-50 transition-all group-hover:scale-110 duration-300">
                    <FiCamera size={20} style={{ color: '#3E5F44' }} />
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
                  <h1 className="text-4xl font-bold text-white mb-2">{formData.nama || "User"}</h1>
                  <p className="text-white/90 text-lg mb-4">{formData.status}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-3 bg-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                          style={{ color: '#3E5F44' }}
                        >
                          <FiEdit2 size={18} />
                          Edit Profile
                        </button>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="px-6 py-3 text-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                          style={{ background: '#3E5F44' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#2d4533'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#3E5F44'}
                        >
                          <FiLock size={18} />
                          Ganti Password
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={submitting}
                          className="px-6 py-3 bg-white rounded-xl font-medium shadow-lg 
                                   hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                          style={{ color: '#3E5F44' }}
                        >
                          <FiSave size={18} />
                          {submitting ? "Menyimpan..." : "Simpan"}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={submitting}
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
                <div className="p-3 rounded-xl" style={{ background: 'rgba(188, 168, 141, 0.2)' }}>
                  <FiActivity size={24} style={{ color: '#BCA88D' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#5C6D5D' }}>Status Akun</p>
                  <p className="font-semibold" style={{ color: '#1E1E1E' }}>Aktif</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(108, 140, 115, 0.2)' }}>
                  <FiClock size={24} style={{ color: '#6C8C73' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#5C6D5D' }}>Bergabung</p>
                  <p className="font-semibold" style={{ color: '#1E1E1E' }}>{formData.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(62, 95, 68, 0.2)' }}>
                  <FiShield size={24} style={{ color: '#3E5F44' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#5C6D5D' }}>Role</p>
                  <p className="font-semibold" style={{ color: '#1E1E1E' }}>Admin</p>
                </div>
              </div>
            </div>

          </div>

          {/* Informasi Akun Section */}
          <div className="rounded-3xl p-8 shadow-xl border"
            style={{
              background: 'linear-gradient(to bottom right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
              borderColor: 'rgba(108, 140, 115, 0.3)'
            }}>

            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E1E1E' }}>Informasi Akun</h2>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3">

              {/* Nama */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Nama</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }}>
                    <FiUser size={20} />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl transition-all outline-none focus-input"
                    />
                  ) : (
                    <div className="w-full pl-12 pr-4 py-3 rounded-xl font-medium"
                      style={{
                        background: 'linear-gradient(to right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
                        color: '#1E1E1E'
                      }}>
                      {formData.nama}
                    </div>
                  )}
                </div>
              </div>

              {/* Kontak/Email */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Kontak</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }}>
                    <FiMail size={20} />
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl transition-all outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
                      title="Email tidak dapat diubah"
                    />
                  ) : (
                    <div className="w-full pl-12 pr-4 py-3 rounded-xl font-medium"
                      style={{
                        background: 'linear-gradient(to right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
                        color: '#1E1E1E'
                      }}>
                      {formData.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Status</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }}>
                    <FiShield size={20} />
                  </div>
                  <div className="w-full pl-12 pr-4 py-3 rounded-xl font-medium"
                    style={{
                      background: 'linear-gradient(to right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
                      color: '#1E1E1E'
                    }}>
                    {formData.status}
                  </div>
                </div>
              </div>

              {/* Additional Info - Only show when editing or if data exists */}
              {(isEditing || formData.location) && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Lokasi</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#5C6D5D' }}>
                      <FiMapPin size={20} />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Kota, Provinsi"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl transition-all outline-none focus-input"
                      />
                    ) : (
                      <div className="w-full pl-12 pr-4 py-3 rounded-xl font-medium"
                        style={{
                          background: 'linear-gradient(to right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
                          color: '#1E1E1E'
                        }}>
                        {formData.location || "-"}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Phone (Optional) */}
              {(isEditing || formData.phone) && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1E1E1E' }}>Nomor HP</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+62 812..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-all outline-none focus-input"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 rounded-xl font-medium"
                      style={{
                        background: 'linear-gradient(to right, rgba(108, 140, 115, 0.15), rgba(62, 95, 68, 0.15))',
                        color: '#1E1E1E'
                      }}>
                      {formData.phone || "-"}
                    </div>
                  )}
                </div>
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
                  <h2 className="text-2xl font-bold" style={{ color: '#1E1E1E' }}>Ganti Password</h2>
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

                <div className="bg-yellow-50 p-4 rounded-xl mb-4 text-sm text-yellow-800">
                  Fitur ganti password ini hanya simulasi UI. Penggantian password sesungguhnya harus dilakukan melalui halaman Auth/Reset Password Supabase.
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                    style={{ background: '#F3F5F2', color: '#5C6D5D' }}
                  >
                    Tutup
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

        .focus-input:focus {
          border-color: #3E5F44 !important;
          box-shadow: 0 0 0 3px rgba(62, 95, 68, 0.1);
        }
      `}</style>
      </div>
    </div>
  );
}