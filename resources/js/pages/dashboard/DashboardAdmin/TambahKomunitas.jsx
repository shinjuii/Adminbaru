import React from "react";

export default function TambahKomunitasModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] p-6 rounded-xl shadow-lg">
        
        <h2 className="text-xl font-semibold mb-4">Tambah Komunitas</h2>

        <div className="grid grid-cols-2 gap-5">

          {/* FORM KIRI */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama komunitas
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Nama komunitas"
            />

            <label className="block text-sm font-medium mb-1">
              Kontak
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Kontak"
            />

            <label className="block text-sm font-medium mb-1">
              Alamat
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Alamat"
            />
          </div>

          {/* UPLOAD FOTO */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                📷
              </div>
            </div>

            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Upload Foto
            </button>
          </div>
        </div>

        {/* DESKRIPSI */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            rows="4"
            className="w-full border rounded-lg p-2"
            placeholder="Deskripsi komunitas..."
          ></textarea>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Batal
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}
