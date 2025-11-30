# 🕌 Sidontaq - Aplikasi Sistem Informasi Manajemen Donasi Pembangunan Masjid Taqwa Muhammadiyah Batam Kota
<img src="public/img/logo-app.jpg" alt="Logo Masjid Taqwa" width="500"/>

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Laravel](https://img.shields.io/badge/Laravel-%23F05340.svg?style=for-the-badge&logo=laravel&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)


## Project Overview

Aplikasi ini bertujuan untuk mengelola **donasi** yang masuk untuk **pembangunan Masjid Taqwa Muhammadiyah Batam Kota**. Sistem ini memungkinkan pengelolaan donasi secara efisien dengan antarmuka pengguna berbasis web yang dibangun menggunakan **ReactJS**, **TailwindCSS**, dan **Laravel** di backend.

---

## **Fitur Utama**

### 1. **Landing Page**
   - Memuat informasi total donasi yang telah terkumpul.
   - Memuat informasi progress pembangunan masjid.
   - Memuat informasi rekapitulasi laporan donasi yang telah diterima.

### 2. **Manajemen Donasi**
   - Pencatatan otomatis setiap transaksi donasi yang masuk, baik melalui transfer bank maupun metode pemberian lainnya.
   - Notifikasi otomatis kepada donatur setelah donasi diterima.
   - Pengelolaan data donatur untuk memudahkan pelacakan riwayat donasi.

### 3. **Laporan Keuangan Transparan**
   - Rekapitulasi pemasukan dan pengeluaran secara otomatis.
   - Pembuatan laporan keuangan yang dapat diakses oleh panitia masjid dan donatur.
   - Penyajian laporan dalam bentuk grafik dan tabel untuk memudahkan analisis keuangan.

### 4. **Halaman Informasi Proyek**
   - Menampilkan informasi terkini mengenai progres pembangunan masjid.
   - Update foto, video, dan laporan perkembangan proyek secara berkala. *(Optional)*
   - Estimasi kebutuhan dana yang masih diperlukan untuk tahap pembangunan selanjutnya.

### 5. **Fitur Donasi Online**
   - Integrasi dengan berbagai metode pembayaran digital (QRIS, transfer bank, e-wallet).
   - Konfirmasi donasi otomatis untuk memudahkan pencatatan.
   - Formulir donasi online yang mudah digunakan oleh donatur.

### 6. **Dashboard Admin**
   - Panel kontrol bagi pengurus masjid untuk mengelola data donasi dan laporan keuangan.
   - Fitur pengelolaan user (admin, panitia, donatur).
   - Sistem audit log untuk mencatat aktivitas dalam sistem guna meningkatkan keamanan.

### 7. **Portal Donatur**
   - Akses bagi donatur untuk melihat riwayat donasi mereka.
   - Notifikasi tentang pencapaian target dana dan perkembangan pembangunan.
   - Fitur berbagi informasi donasi ke media sosial untuk mengajak lebih banyak donatur.

---

## 📁 Project Structure

Berikut adalah struktur folder dari project ini:

```
MasjidTaqwa/
│
├── app/                       # Kode utama Laravel (backend)
│   ├── Http/
│   │   ├── Controllers/       # Controller API
│   └── ...
│
├── public/                    # Output dari Vite dan file publik lainnya
│   ├── build/                 # Output dari Vite (frontend React)
│   └── index.php              # File utama Laravel
│
├── resources/
│   ├── js/                    # Semua file React (frontend)
│   │   ├── components/        # Komponen React
│   │   ├── pages/             # Halaman utama React
│   │   └── app.jsx            # Entry React untuk aplikasi
│   ├── views/                 # Laravel views
│   │   └── react-main.blade.php # Blade untuk React
│   └── css/
│       └── app.css            # Tailwind base styling
│
├── routes/
│   ├── web.php                # Laravel routing (untuk Blade)
│   └── api.php                # Endpoint API Laravel (untuk React)
│
├── database/                  # Migrasi dan Seeder database
│   ├── migrations/            # Migrasi
│   ├── seeders/               # Seeder
│   └── factories/             # Factory data
│
├── .env                       # Konfigurasi environment
├── package.json               # Konfigurasi npm
├── vite.config.js             # Konfigurasi Vite untuk React
├── tailwind.config.js         # Konfigurasi TailwindCSS
└── composer.json              # Konfigurasi Laravel composer
```


## 👨‍💻 Tim Pengembang

| No. | Nama                   | NIM         | Role                          |
|-----|--------------------------------|-------------|---------------------------------------|
| 1   | Muhammad Thariq Syafruddin    | 4342401067  | Database Developer                 |
| 2   | Ibra Marioka                   | 4342401071  | Backend Developer                     |
| 3   | Diva Satria                    | 4342401072  | Frontend Developer                    |
| 4   | Surya Nur Aini                 | 4342401074  | Business Analyst                     |
| 5   | Muhammad Addin                 | 4342401076  | Quality Assurance (QA)          |
| 6   | Nayla Nur Nabila              | 4342401083  | UI/UX Designer  |


## 🛠️ Instalasi dan Setup Lengkap

### Prasyarat
1. Pastikan sudah menginstal [Node.js](https://nodejs.org/en/) dan [Composer](https://getcomposer.org/).
2. Pastikan sudah menginstal [Laravel](https://laravel.com/docs/8.x) dan [MySQL](https://www.mysql.com/) untuk database.

### Langkah-langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/Prodi-TRPL/2C-Pagi-2025-MasjidTaqwa
   cd MasjidTaqwa
   ```

2. **Instalasi Backend (Laravel)**
   - Pindah ke folder backend:
     ```bash
     cd backend
     ```
   - Instalasi dependensi Laravel:
     ```bash
     composer install
     ```
   - Copy file `.env.example` ke `.env`:
     ```bash
     cp .env.example .env
     ```
   - Generate key aplikasi:
     ```bash
     php artisan key:generate
     ```
   - Jalankan migrasi dan seeder:
     ```bash
     php artisan migrate --seed
     ```
   - Jalankan server Laravel:
     ```bash
     php artisan serve
     ```

3. **Instalasi Frontend (React + TailwindCSS)**
   - Pindah ke folder frontend:
     ```bash
     cd frontend
     ```
   - Instalasi dependensi frontend:
     ```bash
     npm install
     ```
   - Jalankan server development Vite:
     ```bash
     npm run dev
     ```

   Aplikasi akan berjalan di `http://localhost:3000`.

### Setup Environment
1. Atur konfigurasi `.env` di folder `backend` sesuai dengan environment (database, API keys, dll).
2. Pastikan koneksi database dan konfigurasi lainnya telah sesuai.

### 📄 Konfigurasi File `.env`

Sebelum menjalankan aplikasi, pastikan kamu sudah menyiapkan file konfigurasi environment.

File `.env.example` **sudah tersedia** di dalam project ini dan dapat langsung digunakan sebagai template.

#### Langkah-langkah:
1. **Salin file `.env.example` menjadi `.env`:**

   ```bash
   cp .env.example .env

## 🔧 Script Tersedia

Sidontaq menyediakan script yang tersedia di dalam `package.json` untuk mempermudah pengembangan:

## 📜 Script Tersedia

| Script | Perintah |
|:---|:---|
| `npm run dev` | Menjalankan **Laravel server** dan **Vite dev server** secara bersamaan untuk pengembangan. |
| `npm run build` | Build **frontend** (React + Tailwind) menggunakan Vite untuk produksi. |
| `npm run serve` | Menjalankan **Laravel server** saja. |
| `npm run hot` | Menjalankan **Vite dev server** dengan **Hot Module Replacement** (HMR) aktif. |
| `npm run frontend:lint` | Menjalankan **ESLint** untuk melakukan pengecekan kode pada `resources/js`. |
| `npm run frontend:test` | Placeholder untuk menambahkan testing pada project React (bisa diubah sesuai kebutuhan). |
| `npm run db:fresh` | Menjalankan migrasi database **fresh** dan seed data ulang (menghapus semua data sebelumnya). |
| `npm run db:setup` | Menjalankan migrasi database dan seed data tanpa menghapus data lama. |
| `npm run storage:link` | Membuat symbolic link dari `storage` ke `public/storage` untuk akses file upload. |
| `npm run clear:cache` | Membersihkan semua cache: config, route, view, dan cache umum Laravel. |
| `npm run setup` | Instal semua dependensi (`npm` dan `composer`), setup environment, generate key Laravel, migrasi dan seed database, membuat storage link, install `concurrently`, serta clear cache. |


### Backend Setup
- **`php artisan migrate`**: Menjalankan migrasi untuk database.
- **`php artisan db:seed`**: Menjalankan seeder untuk mengisi data awal.

### Frontend Setup
- **`npm run build`**: Membuat build untuk frontend React.
- **`npm run dev`**: Menjalankan server development untuk React dengan Vite.

---

## ⚠️ Troubleshooting

| 🔍 Masalah Umum | 💡 Solusi Cepat |
|-----------------|----------------|
| **🛑 Laravel tidak bisa jalan / error saat serve** | Pastikan `.env` sudah dikonfigurasi dengan benar dan dependencies backend telah terinstall:<br>`composer install`<br>`php artisan key:generate` |
| **⚙️ Perubahan di UI tidak muncul** | Coba jalankan ulang dev server React:<br>`npm run dev` |
| **📦 Dependency error (npm/composer)** | Hapus dan install ulang dependencies:<br>`rm -rf node_modules`<br>`rm package-lock.json`<br>`npm install`<br>dan/atau<br>`composer install` |
| **❌ Error saat migrate database** | Coba reset ulang database:<br>`php artisan migrate:fresh --seed`<br>Pastikan koneksi DB di `.env` benar |
| **📂 File upload tidak muncul di storage/public** | Buat ulang symbolic link ke storage:<br>`php artisan storage:link` |
| **🔥 Cache masih menyimpan data lama** | Bersihkan semua cache Laravel:<br>`php artisan cache:clear`<br>`php artisan config:clear`<br>`php artisan view:clear`<br>`php artisan route:clear` |
| **🌐 Port bentrok saat menjalankan dev** | Ubah port Vite atau Laravel server di `.env` atau langsung lewat command line:<br>`php artisan serve --port=8001`<br>`vite --port 5174` |

## 🚧 Catatan Pengembangan
- Pastikan untuk membuat **branch terpisah** untuk setiap fitur atau bug fix yang dikerjakan.
- Jangan lupa untuk selalu **commit** dan **push** perubahan secara berkala.
- Gunakan **PR/MR (Pull Request/Merge Request)** untuk kolaborasi yang lebih mudah.

---

## 🛠️ Metode Pengembangan

Proyek dikembangkan menggunakan pendekatan metodologi **Waterfall**.

### 📌 Tahapan Pengembangan:

| Tahapan                  | Durasi         | Deskripsi                                                                 |
|--------------------------|----------------|---------------------------------------------------------------------------|
| **Requirement Analysis** | 2 minggu       | Mengumpulkan kebutuhan sistem dari pengguna dan stakeholder.              |
| **System Design**        | 2 minggu       | Mendesain arsitektur sistem, struktur database, dan antarmuka aplikasi.   |
| **Implementation**       | 5 minggu       | Proses pengembangan kode program, integrasi frontend & backend.           |
| **Testing**              | 3 minggu       | Pengujian fungsionalitas sistem, validasi, dan perbaikan bug.             |
| **Deployment**           | 1 minggu       | Peluncuran sistem ke lingkungan produksi dan penyebaran ke pengguna.      |
| **Maintenance**          | Berkelanjutan  | Pemeliharaan sistem, perbaikan error, serta penyesuaian kebutuhan baru.   |

---

## 📜 Lisensi

MIT License

Copyright (c) 2025 Tim PBL TRPL-212, Politeknik Negeri Batam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Troubleshooting Donation System

If you're having issues with the donation system, follow these steps to diagnose and fix the problem:

### Step 1: Fix Database Issues

1. Run the fix-donations utility:
```bash
php artisan migrate
```

This will run migrations that:
- Update all donations to have "Diterima" status
- Set payment_type and metode_pembayaran_id for donations with NULL values
- Add missing snap_tokens to donations

Alternatively, visit `/fix-donations` in your browser to run a similar fix.

### Step 2: Testing Without Midtrans

To bypass Midtrans integration and test the donation flow directly:

1. Visit `/simple-donation` in your browser to use the simplified donation form
2. This form uses a direct POST to `/api/donasi/simple` which doesn't require Midtrans integration
3. Donations made through this form will appear in the admin dashboard

### Step 3: Common Issues and Fixes

#### Database Schema Issues

If you see errors like:

```
Terjadi kesalahan pada sistem database. Silakan hubungi administrator.
```

This could be because:
- Missing columns in the `donasi` table
- Incorrect relationship with `metode_pembayaran` table
- NULL values in required fields

#### Payment Gateway Issues

If you see errors like:

```
Gagal terhubung ke layanan pembayaran. Mohon coba lagi nanti.
```

This could be because:
- Midtrans configuration is missing or incorrect in your `.env` file
- Network issues connecting to Midtrans servers
- Midtrans JavaScript snap library isn't loaded

#### 401 Unauthorized Errors

If you see 401 errors when the donation form loads:

```
GET http://localhost:8000/api/user 401 (Unauthorized)
```

This is normal and doesn't affect functionality - it just means the user isn't logged in. The donation form will still work for anonymous donations.

### Step 4: Component Relationships

- `DonasiSekarang.jsx` loads `DonationFirstPage.jsx` which handles the donation form
- When a donation is submitted, it goes to either:
  - `/api/donasi` (Midtrans integration)
  - `/api/donasi/simple` (Simple testing without Midtrans)
- Successful donations should appear in the admin dashboard (`DataDonasi.jsx`)
  - The dashboard fetches data from `/api/donations` endpoint
  - This endpoint is handled by `DonationHistoryController.php`

### Step 5: Verifying Donations

To verify donations are working correctly:

1. Submit a test donation through `/simple-donation`
2. Check the admin dashboard at `/dashboard/admin/data-donasi`
3. Donations should appear with "Diterima" status
4. If donations don't appear, check the browser console for errors

# Analisis Normalisasi Tabel Database MasjidTaqwa

## Tabel: pengguna
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Primary key adalah `pengguna_id` (UUID), dan seluruh atribut lain (nama, email, password, dll) secara fungsional bergantung hanya pada primary key. Tidak ada ketergantungan transitif atau ketergantungan parsial.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| pengguna_id           | UUID            | PRIMARY KEY                 |
| nama                  | VARCHAR(100)    | nullable                    |
| email                 | VARCHAR(100)    | nullable, unique            |
| password              | VARCHAR(255)    | nullable                    |
| role                  | ENUM            | 'admin', 'donatur'          |
| nomor_hp              | VARCHAR(15)     | nullable                    |
| created_at            | TIMESTAMP       | nullable                    |
| can_donate            | BOOLEAN         | default: true               |
| can_view_history      | BOOLEAN         | default: true               |
| can_view_notification | BOOLEAN         | default: true               |

### Contoh Data
| pengguna_id                           | nama           | email                  | password (hashed)                                       | role    | nomor_hp      | created_at          | can_donate | can_view_history | can_view_notification |
|--------------------------------------|----------------|------------------------|--------------------------------------------------------|---------|---------------|---------------------|------------|-----------------|----------------------|
| 550e8400-e29b-41d4-a716-446655440000 | Ahmad Fauzi    | ahmad@example.com      | $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | admin   | 081234567890  | 2025-06-01 08:00:00 | true       | true            | true                 |
| 6ba7b810-9dad-11d1-80b4-00c04fd430c8 | Siti Rahayu    | siti@example.com       | $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | donatur | 089876543210  | 2025-06-01 09:30:00 | true       | true            | true                 |

**1NF**: ✓ Semua nilai atribut adalah atomik (tidak bisa dibagi lagi)
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif (atribut non-kunci bergantung pada atribut non-kunci lainnya)
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: laporan_keuangan
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Primary key adalah `laporan_keuangan_id`, dan semua atribut lainnya bergantung penuh pada primary key tersebut. Tidak ada ketergantungan transitif.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| laporan_keuangan_id   | UUID            | PRIMARY KEY                 |
| bulan                 | VARCHAR(50)     |                             |
| tahun                 | INT             |                             |
| total_pemasukan       | DECIMAL(15,2)   | default: 0                  |
| total_pengeluaran     | DECIMAL(15,2)   | default: 0                  |

### Contoh Data
| laporan_keuangan_id                  | bulan     | tahun | total_pemasukan | total_pengeluaran |
|-------------------------------------|-----------|-------|-----------------|-------------------|
| 7dc53df5-703e-49b3-8670-b1c468f47f1f | Juni      | 2025  | 15000000.00     | 7500000.00        |
| e23a9520-7ad7-4b3a-b4e7-59812b3b5c01 | Juli      | 2025  | 18500000.00     | 9200000.00        |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: kategori_pengeluaran
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Memiliki primary key `kategori_id` dengan atribut `nama` yang bergantung langsung pada primary key. Struktur tabel sangat sederhana dan sudah optimal.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| kategori_id           | VARCHAR(255)    | PRIMARY KEY                 |
| nama                  | VARCHAR(100)    |                             |

### Contoh Data
| kategori_id                          | nama                    |
|-------------------------------------|-------------------------|
| 9b2d8f91-a8b7-4c60-9c0d-53e5dd63b9a5 | Pembelian Material      |
| 4f9e8d7c-6b5a-4c3d-2e1f-0a9b8c7d6e5f | Upah Tukang            |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: proyek_pembangunan
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Primary key adalah `proyek_id` dan seluruh atribut non-kunci (`admin_id`, `nama_item`, `deskripsi`, dll.) bergantung langsung pada primary key. Foreign key `admin_id` sudah tepat untuk relasi dengan tabel pengguna.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| proyek_id             | VARCHAR(255)    | PRIMARY KEY                 |
| admin_id              | UUID            | FOREIGN KEY                 |
| nama_item             | VARCHAR(255)    |                             |
| deskripsi             | TEXT            |                             |
| target_dana           | DECIMAL(15,2)   |                             |
| dana_terkumpul        | DECIMAL(15,2)   | default: 0                  |
| created_at            | TIMESTAMP       |                             |
| gambar                | VARCHAR(255)    | nullable                    |

### Contoh Data
| proyek_id                            | admin_id                             | nama_item            | deskripsi                        | target_dana  | dana_terkumpul | created_at          | gambar             |
|-------------------------------------|--------------------------------------|----------------------|----------------------------------|--------------|----------------|---------------------|-------------------|
| 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p | 550e8400-e29b-41d4-a716-446655440000 | Renovasi Kubah       | Renovasi kubah masjid yang rusak | 100000000.00 | 75000000.00    | 2025-06-05 10:00:00 | kubah.jpg         |
| 2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q | 550e8400-e29b-41d4-a716-446655440000 | Perluasan Area Sholat | Perluasan area sholat utama      | 200000000.00 | 120000000.00   | 2025-06-10 14:30:00 | area_sholat.jpg   |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: pengeluaran
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Primary key adalah `pengeluaran_id`, dengan dependensi fungsional penuh dari semua atribut non-kunci ke primary key. Foreign key `penginput_id`, `kategori_id`, dan `proyek_id` menunjukkan relasi yang tepat ke tabel lain.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| pengeluaran_id        | VARCHAR(255)    | PRIMARY KEY                 |
| penginput_id          | UUID            | FOREIGN KEY                 |
| kategori_id           | VARCHAR(255)    | FOREIGN KEY                 |
| proyek_id             | VARCHAR(255)    | FOREIGN KEY                 |
| jumlah                | DECIMAL(15,2)   |                             |
| keterangan            | TEXT            |                             |
| tanggal_pengeluaran   | DATE            |                             |
| created_at            | TIMESTAMP       | nullable                    |

### Contoh Data
| pengeluaran_id                       | penginput_id                         | kategori_id                         | proyek_id                            | jumlah      | keterangan                 | tanggal_pengeluaran | created_at          |
|-------------------------------------|-------------------------------------|-------------------------------------|-------------------------------------|-------------|---------------------------|---------------------|---------------------|
| 3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r | 550e8400-e29b-41d4-a716-446655440000 | 9b2d8f91-a8b7-4c60-9c0d-53e5dd63b9a5 | 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p | 25000000.00 | Pembelian bahan kubah      | 2025-06-15         | 2025-06-15 09:45:00 |
| 4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s | 550e8400-e29b-41d4-a716-446655440000 | 4f9e8d7c-6b5a-4c3d-2e1f-0a9b8c7d6e5f | 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p | 15000000.00 | Pembayaran upah tukang     | 2025-06-20         | 2025-06-20 15:30:00 |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: donasi
- Bentuk Normal: 1NF → 2NF → 3NF

Analisis:
Tabel donasi memenuhi 3NF tetapi tidak sepenuhnya BCNF. Meskipun tidak ada ketergantungan transitif antara atribut non-kunci, tabel ini menyimpan data donatur (name, email) yang seharusnya disimpan di tabel terpisah berdasarkan konsep BCNF ketat. Namun, struktur ini dapat dipertahankan karena pertimbangan praktis, seperti:
1. Memungkinkan donasi anonim atau donasi satu kali tanpa perlu membuat akun pengguna
2. Memudahkan proses bisnis dan mengurangi kompleksitas aplikasi

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| donasi_id             | VARCHAR(255)    | PRIMARY KEY                 |
| pengguna_id           | UUID            | FOREIGN KEY, nullable       |
| laporan_keuangan_id   | VARCHAR(255)    | FOREIGN KEY                 |
| jumlah                | DECIMAL(15,2)   |                             |
| status                | ENUM            | 'Diterima','Pending','Kadaluarsa','Dibatalkan' |
| order_id              | VARCHAR(255)    | nullable                    |
| payment_type          | VARCHAR(50)     | nullable                    |
| snap_token            | VARCHAR(255)    | nullable                    |
| name                  | VARCHAR(100)    | nullable                    |
| email                 | VARCHAR(100)    | nullable                    |
| created_at            | TIMESTAMP       | nullable                    |
| updated_at            | TIMESTAMP       | nullable                    |

### Contoh Data
| donasi_id                            | pengguna_id                           | laporan_keuangan_id                  | jumlah      | status    | order_id           | payment_type | snap_token         | name         | email                | created_at          | updated_at          |
|-------------------------------------|--------------------------------------|-------------------------------------|-------------|-----------|-------------------|-------------|-------------------|--------------|---------------------|---------------------|---------------------|
| 5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 | 7dc53df5-703e-49b3-8670-b1c468f47f1f | 5000000.00  | Diterima  | ORDER-123456      | bank_transfer | tok_abcd1234      | Siti Rahayu  | siti@example.com     | 2025-06-15 10:30:00 | 2025-06-15 11:00:00 |
| 6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u | null                                 | 7dc53df5-703e-49b3-8670-b1c468f47f1f | 2500000.00  | Diterima  | ORDER-123457      | credit_card  | tok_efgh5678      | Budi Santoso | budi@example.com     | 2025-06-16 14:15:00 | 2025-06-16 14:20:00 |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif antar atribut non-key
**BCNF**: ✗ Tidak memenuhi karena atribut name dan email memiliki dependensi fungsional yang tidak bergantung pada candidate key (teoritis saja, dalam praktek tidak masalah)

### Struktur Tabel untuk BCNF (Optional)
#### Tabel donasi (revisi)
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| donasi_id             | VARCHAR(255)    | PRIMARY KEY                 |
| pengguna_id           | UUID            | FOREIGN KEY (nullable)      |
| donatur_id            | BIGINT          | FOREIGN KEY (baru)          |
| laporan_keuangan_id   | VARCHAR(255)    | FOREIGN KEY                 |
| jumlah                | DECIMAL(15,2)   |                             |
| status                | ENUM            | Diterima/Pending/Kadaluarsa |
| order_id              | VARCHAR(255)    |                             |
| payment_type          | VARCHAR(50)     |                             |
| snap_token            | VARCHAR(255)    |                             |
| created_at            | TIMESTAMP       |                             |
| updated_at            | TIMESTAMP       |                             |

#### Tabel donatur (baru)
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| id                    | BIGINT          | PRIMARY KEY, AUTO INCREMENT |
| name                  | VARCHAR(100)    |                             |
| email                 | VARCHAR(100)    |                             |

## Tabel: notifikasi
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis: 
Tabel ini telah memenuhi BCNF. Primary key adalah `notifikasi_id`, dan seluruh atribut (judul, isi, pengguna_id, dll.) bergantung langsung pada primary key. Relasi dengan tabel pengguna melalui `pengguna_id` sudah tepat.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| notifikasi_id         | VARCHAR(255)    | PRIMARY KEY                 |
| pengguna_id           | UUID            | FOREIGN KEY                 |
| isi                   | TEXT            |                             |
| is_read               | BOOLEAN         | default: false              |
| judul                 | VARCHAR(255)    | nullable                    |
| created_at            | TIMESTAMP       | nullable                    |
| updated_at            | TIMESTAMP       | nullable                    |

### Contoh Data
| notifikasi_id                        | pengguna_id                           | isi                               | is_read | judul                    | created_at          | updated_at          |
|-------------------------------------|--------------------------------------|-----------------------------------|---------|--------------------------|---------------------|---------------------|
| 7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 | Donasi Anda telah diterima        | false   | Konfirmasi Donasi        | 2025-06-15 11:00:00 | null                |
| 8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 | Terima kasih atas dukungan Anda   | true    | Ucapan Terima Kasih      | 2025-06-16 09:30:00 | 2025-06-16 10:15:00 |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Tabel: donation_settings
- Bentuk Normal: 1NF → 2NF → 3NF → BCNF

Analisis:
Tabel ini telah memenuhi BCNF. Primary key adalah `id`, dan seluruh atribut lainnya bergantung hanya pada primary key. Foreign key `proyek_id`, `created_by`, dan `last_updated_by` telah menunjukkan relasi yang tepat dengan tabel lain.

### Struktur Tabel
| Kolom                 | Tipe Data       | Keterangan                  |
|-----------------------|-----------------|----------------------------- |
| id                    | BIGINT          | PRIMARY KEY                 |
| proyek_id             | VARCHAR(255)    | FOREIGN KEY, nullable       |
| is_donation_active    | BOOLEAN         | default: true               |
| donation_end_date     | DATE            | nullable                    |
| donation_target       | DECIMAL(15,2)   | nullable                    |
| message_type          | VARCHAR(10)     | default: 'warning'          |
| denial_message        | TEXT            | nullable                    |
| created_by            | UUID            | FOREIGN KEY, nullable       |
| last_updated_by       | UUID            | FOREIGN KEY, nullable       |
| created_at            | TIMESTAMP       |                             |
| updated_at            | TIMESTAMP       |                             |

### Contoh Data
| id | proyek_id                            | is_donation_active | donation_end_date | donation_target | message_type | denial_message                         | created_by                             | last_updated_by                        | created_at          | updated_at          |
|----|-------------------------------------|-------------------|------------------|----------------|-------------|---------------------------------------|--------------------------------------|--------------------------------------|---------------------|---------------------|
| 1  | 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p | true              | 2025-12-31       | 100000000.00    | info        | null                                  | 550e8400-e29b-41d4-a716-446655440000 | 550e8400-e29b-41d4-a716-446655440000 | 2025-06-01 08:00:00 | 2025-06-15 10:30:00 |
| 2  | 2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q | true              | 2026-06-30       | 200000000.00    | warning     | Donasi untuk proyek ini akan berakhir | 550e8400-e29b-41d4-a716-446655440000 | null                                 | 2025-06-10 14:00:00 | 2025-06-10 14:00:00 |

**1NF**: ✓ Semua nilai atribut adalah atomik
**2NF**: ✓ Memenuhi 1NF dan semua atribut non-kunci bergantung sepenuhnya pada primary key
**3NF**: ✓ Memenuhi 2NF dan tidak ada ketergantungan transitif
**BCNF**: ✓ Memenuhi 3NF dan setiap determinan adalah candidate key

## Kesimpulan

Mayoritas tabel dalam database MasjidTaqwa telah memenuhi bentuk normal BCNF, yang merupakan bentuk normalisasi tertinggi yang umum digunakan. Satu-satunya pengecualian adalah tabel `donasi` yang secara teknis hanya memenuhi 3NF. 

Namun, struktur tabel `donasi` merupakan trade-off yang dapat diterima antara normalisasi ketat dan kebutuhan bisnis. Dengan mempertahankan informasi donatur langsung di tabel donasi, aplikasi dapat menangani donasi anonim atau satu kali dengan lebih efisien.

Secara keseluruhan, skema database sudah terstruktur dengan baik dan mempertimbangkan keseimbangan antara konsistensi data dan performa aplikasi. # DashboardAdminn
