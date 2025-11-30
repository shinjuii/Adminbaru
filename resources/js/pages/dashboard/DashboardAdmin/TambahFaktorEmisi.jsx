import { useState } from "react";

const jenisList = ["Motor", "Mobil", "Bus", "Truk"];

export default function TambahFaktorEmisi({ onClose, onSubmit }) {
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [faktorEmisi, setFaktorEmisi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      jenis_kendaraan: jenisKendaraan,
      faktor_emisi: parseFloat(faktorEmisi),
    });

    setJenisKendaraan("");
    setFaktorEmisi("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[400px] shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Tambah Faktor Emisi</h2>

        {/* Dropdown Jenis Kendaraan */}
        <label className="block mb-2 text-sm font-medium">Jenis Kendaraan</label>
        <select
          value={jenisKendaraan}
          onChange={(e) => setJenisKendaraan(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          required
        >
          <option value="">Pilih jenis kendaraan</option>
          {jenisList.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>

        {/* Input Faktor Emisi */}
        <label className="block mb-2 text-sm font-medium">
          Faktor Emisi (Kg CO₂/Km)
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="Contoh: 4.22"
          className="w-full border rounded-lg p-2 mb-4"
          value={faktorEmisi}
          onChange={(e) => setFaktorEmisi(e.target.value)}
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
