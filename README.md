<div align="center">

  <h1 align="center">Ruang Baca</h1>

  <h3 align="center">
    Tugas Besar Projek Teknologi Informasi <br/>
    Perpustakaan SMK Negeri 7 Bandar Lampung
  </h3>
</div>

## Deskripsi Umum
"RUANG BACA" adalah sebuah platform perpustakaan digital yang memungkinkan pengguna, baik admin maupun anggota perpustakaan, untuk melakukan berbagai aktivitas terkait manajemen perpustakaan. Platform ini menawarkan layanan peminjaman dan pengembalian buku, manajemen inventaris, serta pengingat melalui WhatsApp untuk batas waktu peminjaman dan informasi denda.

## Fitur Utama

### 1. Peminjaman dan Pengembalian
- **Pengguna (User):** Anggota perpustakaan dapat melakukan peminjaman dan pengembalian buku melalui antarmuka yang ramah pengguna di situs web.
- **Admin:** Admin memiliki kontrol penuh terhadap peminjaman dan pengembalian, memungkinkan mereka untuk mengelola inventaris dengan efisien.

### 2. Manajemen Inventaris
- **Pengguna:** Pengguna dapat menjelajahi katalog buku, melihat detail buku, dan memeriksa ketersediaan.
- **Admin:** Admin dapat menambahkan, mengedit, atau menghapus buku dari inventaris. Mereka juga dapat melacak status peminjaman dan pengembalian.

### 3. Pengingat Melalui WhatsApp
- **Sistem Pengingat:** Platform ini terhubung dengan layanan WhatsApp untuk memberikan pengingat kepada pengguna melalui pesan WhatsApp terkait batas waktu peminjaman dan informasi denda.
- **Automatisasi:** Dengan menggunakan layanan WhatsApp, pengguna akan menerima pemberitahuan secara otomatis sebelum atau pada saat jatuh tempo pengembalian buku.

### 4. Denda
- **Perhitungan Denda:** Sistem menghitung denda berdasarkan batas waktu pengembalian yang terlewat.
- **Informasi Denda:** Pengguna menerima informasi mengenai jumlah denda yang harus dibayarkan melalui pesan WhatsApp

## Teknologi yang Digunakan
- **Backend:** Menggunakan <b>Node.js, Express, Socket.io dan PostgreSQL.</b>
- **Frontend:** Menggunakan <b>React JS, Vite, Socker.io Client, Boostraps, Axios dan Redux Saga.</b>

## Keuntungan
- **Pelayanan Efisien:** Memudahkan pengguna dan admin dalam manajemen perpustakaan secara efisien.
- **Pemberitahuan Real-time:** Pemberitahuan melalui WhatsApp memberikan layanan real-time untuk pengingat batas waktu dan denda.
- **Inventaris yang Terkelola Baik:** Admin dapat dengan mudah mengelola inventaris dan melacak status peminjaman.

## Persyaratan
 - Node JS ^18.14
 - PostgreSQL ^16.1
 - Yarn atau NPM

<!-- GETTING STARTED -->
## Cara Menggunakan Frontend
- Clone repository ini
- Masuk folder frontend
- Ubah nama file `.env.example` menjadi `.env`
- Ubah isi `.env` dengan URL Backend
- Buka terminal dan jalankan `yarn` untuk install library
- Tunggu Hingga instalasi selesai dan jalankan `yarn dev`
- Buka Browser dan jalankan `http://localhost:5173`

## Cara Menggunakan Backend
- Ubah isi dari .env
    - database connection
    - jwt random random for jwt token
    - expire time for short period
    - expire time for long period
    - url that you use
- Install Library dengan `npm install`
- Buat folder `uploads` untuk menyimpan gambar
- Berikan file `default.jpg` pada folder uploads
- Jalankan Backend dengan `node index.js`
<!-- LICENSE -->
## Lisensi
Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE.txt` untuk informasi lebih lanjut.



<!-- CONTACT -->
## Kontribusi
| Nama |  Contributor |
| :---: |  :---: |
| **[Hans Bonatua Batubara](https://github.com/Hans299)**   | Projek Manajer |
| **[Dean Andhika Ramadhan](https://github.com/deanandhkr)**  | UI/UX Desainer |
| **[Ryan Ernanda](https://github.com/ryan-ern)**  | Fullstack Developer |
| **[Imam Windharko](https://github.com/windharko)**   | Backend Developer |
| **[Indra Jaya Putra](https://github.com/indraphy)**   | Frontend Developer |
| **[Muhammad Hadi Arsa](https://github.com/HadiAr20)**   | Technical Writer |
| **[Hanif Putra Agusta](https://github.com/hanif354-bayte)**    | Technical Writer |
| **[Abi Luthfi Ramdan F](https://github.com/Abiluthfi)**    | Website Tester |
