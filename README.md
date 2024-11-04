

# Tokopedia Clone Project

Proyek ini adalah replika sederhana dari Tokopedia, yang menggabungkan backend dan frontend untuk menyediakan antarmuka pengguna e-commerce lengkap. Backend dibuat menggunakan Express.js dengan PostgreSQL untuk database, sedangkan frontend dibangun menggunakan Next.js dengan Tailwind CSS untuk desain responsif dan interaktif.

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
  - [1. Cloning Repository](#1-cloning-repository)
  - [2. Konfigurasi Environment Variables](#2-konfigurasi-environment-variables)
  - [3. Pengaturan Backend](#3-pengaturan-backend)
  - [4. Pengaturan Frontend](#4-pengaturan-frontend)
- [Struktur Proyek](#struktur-proyek)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Troubleshooting](#troubleshooting)
- [Pengaturan Produksi](#pengaturan-produksi)

## Prasyarat

Pastikan perangkat Anda telah menginstal komponen berikut:

- **Node.js** (versi 14 atau lebih baru)
- **npm** atau **yarn** (untuk manajemen paket)
- **PostgreSQL** (untuk database backend)
- **Redis** (opsional, jika menggunakan caching Redis)
- **Cloudinary** (opsional, untuk penyimpanan media jika diperlukan)

## Instalasi

### 1. Cloning Repository

Clone repository ini ke komputer Anda:

```bash
git clone https://github.com/username/tokopedia-clone.git
cd tokopedia-clone
```

### 2. Konfigurasi Environment Variables

Duplikat file `.env.example` menjadi `.env` di masing-masing folder `backend` dan `frontend`, lalu masukkan nilai variabel environment yang diperlukan.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Pengaturan Backend

#### a. Instalasi Dependensi

Pindah ke direktori `backend` dan instal dependensinya:

```bash
cd backend
npm install
```

#### b. Pengaturan Database PostgreSQL

Aktifkan PostgreSQL dan buat database baru untuk proyek ini. Kemudian, perbarui file `.env` backend dengan informasi konfigurasi database Anda:

```plaintext
POSTGRES_URL="postgres://username:password@localhost:5432/tokopedia_db"
```

Jika Anda ingin menggunakan Redis untuk caching, pastikan Redis aktif, lalu tambahkan URL Redis di `.env`:

```plaintext
REDIS_URL="redis://localhost:6379"
```

#### c. Prisma Migrate

Lakukan migrasi database menggunakan Prisma:

```bash
npx prisma migrate dev --name init
```

#### d. Seed Data (Opsional)

Untuk mengisi data awal ke database, gunakan perintah berikut:

```bash
npx prisma db seed
```

#### e. Menjalankan Server Backend

Jalankan server backend dalam mode development:

```bash
npm run dev
```

Server backend akan aktif di `http://localhost:5000` (sesuaikan port jika berbeda).

### 4. Pengaturan Frontend

#### a. Instalasi Dependensi

Pindah ke direktori `frontend` dan instal dependensinya:

```bash
cd ../frontend
npm install
```

#### b. Konfigurasi Environment

Tambahkan URL API backend yang akan digunakan di file `.env` frontend:

```plaintext
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

#### c. Menjalankan Server Frontend

Jalankan server frontend dalam mode development:

```bash
npm run dev
```

Server frontend akan aktif di `http://localhost:3000` (atau port yang Anda tentukan).

## Struktur Proyek

- **backend/**: Kode server backend yang menggunakan Express.js dan Prisma untuk interaksi database.
- **frontend/**: Aplikasi frontend yang dibuat dengan Next.js dan Tailwind CSS.

## Skrip yang Tersedia

Di masing-masing folder (`backend` dan `frontend`), berikut adalah beberapa skrip npm yang tersedia:

- **Backend**:
  - `npm run dev`: Menjalankan server backend dalam mode development.
  - `npm run build`: Membuat build backend untuk mode produksi.
  - `npm run start`: Menjalankan server backend dalam mode produksi.
  - `npx prisma migrate dev`: Melakukan migrasi database.
  - `npx prisma studio`: Membuka Prisma Studio untuk mengelola data.

- **Frontend**:
  - `npm run dev`: Menjalankan server frontend dalam mode development.
  - `npm run build`: Membuat build frontend untuk mode produksi.
  - `npm run start`: Menjalankan frontend dalam mode produksi.

## Teknologi yang Digunakan

- **Backend**:
  - Express.js, Prisma, PostgreSQL
  - Redis (opsional, untuk caching)
  - Cloudinary (opsional, untuk penyimpanan media)

- **Frontend**:
  - Next.js, React, Tailwind CSS
  - React Query (untuk pengelolaan data)
  - Zustand (untuk manajemen state)

## Troubleshooting

### Masalah Umum

1. **Error koneksi database**: Pastikan PostgreSQL berjalan dan variabel environment `.env` sudah benar.
2. **Error Redis**: Jika Redis digunakan, pastikan Redis aktif dan terkonfigurasi dengan benar.
3. **Frontend gagal mengambil data dari API**: Pastikan URL API backend di `.env` frontend benar dan server backend sedang berjalan.

## Pengaturan Produksi

Untuk deployment, Anda bisa menggunakan platform seperti Vercel untuk frontend dan Railway atau Heroku untuk backend. Pastikan untuk mengatur variabel environment yang relevan pada platform tersebut. Lihat dokumentasi masing-masing platform untuk panduan lengkap.

---

Dengan mengikuti panduan ini, Anda dapat menjalankan aplikasi Tokopedia Clone secara lokal dan mengembangkan fitur lebih lanjut. Selamat mencoba!
