import { Pencil, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../../layout/AppSidebar";

export default function KontenAdd() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AppSidebar />

      <div className="flex-1 ml-[90px] lg:ml-[290px] p-8">
        
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">
          Konten Edukasi
        </h1>

        <div className="bg-white p-6 rounded-xl shadow border">

          {/* FORM GRID */}
          <div className="grid grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="col-span-2">
              
              {/* JUDUL */}
              <label className="text-sm font-medium">Judul Konten</label>
              <div className="flex items-center bg-green-100 p-2 rounded-lg mb-4">
                <input
                  type="text"
                  placeholder="Masukkan judul konten..."
                  className="flex-1 bg-transparent outline-none"
                />
                <Pencil size={18} className="text-gray-600" />
              </div>

              {/* KATEGORI */}
              <label className="text-sm font-medium">Kategori</label>
              <div className="flex items-center bg-green-100 p-2 rounded-lg mb-4">
                <input
                  type="text"
                  placeholder="Kategori"
                  className="flex-1 bg-transparent outline-none"
                />
                <Pencil size={18} className="text-gray-600" />
              </div>

              {/* DESKRIPSI */}
              <label className="text-sm font-medium">Deskripsi Konten</label>
              <textarea
                className="w-full bg-green-100 p-3 rounded-lg h-40 outline-none resize-none"
                placeholder="Tulis deskripsi konten..."
              ></textarea>

            </div>

            {/* RIGHT SIDE — UPLOAD GAMBAR */}
            <div className="col-span-1 flex flex-col items-center">

              <div className="w-full bg-green-100 h-48 rounded-lg flex items-center justify-center mb-2">
                <ImagePlus size={48} className="text-gray-600" />
              </div>

              <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
                Upload Gambar
              </button>

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Batal
            </button>

            <button className="px-4 py-2 bg-green-700 text-white rounded-lg">
              Simpan
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
