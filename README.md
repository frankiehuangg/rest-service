# Twitter REST Service
### Tugas Besar 2 IF3110
### Milestone 2 -  Web Services using SOAP and REST
### Kelompok 45

### Deskripsi REST Service
REST service ini menangani layanan yang diperlukan oleh _client side_ seperti memperoleh data untuk tiap halaman, membuat data baru, menghapus data yang sudah ada, dll. Service ini dibuat menggunakan bahasa NodeTS dan Express.

### Skema Basis Data
![Skema Basis Data](doc/RESTservice.png)

NOTE: Bagian yang terdapat pada basis data adalah entitas yang berwarna biru

### Daftar Requirement
Berikut merupakan daftar requirements untuk aplikasi:
1. npm
2. typescript
3. prisma
4. PostgreSQL
5. jwt
6. node express

### Cara Instalasi
1. Unduh requirements yang belum tersedia
2. Lakukan instalasi requirements
3. Lakukan Clone pada repository ini
4. Pada direktori ini, jalankan perintah `npm install`
5. Buat file bernama `.env`, copy isi file `.env.example` ke `.env`. Sesuaikan isinya dengan spesifikasi database yang sudah ada
6. REST Service siap dijalankan

### Cara Menjalankan Server
1. Pastikan server MySQL XAMPP dengan database yang sesuai sudah berjalan
2. Pada direktori ini, jalankan perintah `npm run dev`
3. REST Service berhasil dijalankan

### REST Service Endpoints dan Penugasannya

User Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /user    | GET    | 13521057 | untuk memperoleh data user dengan id user sebagai query parameter |
| /user/current | GET | 13521057 | untuk memperoleh data pengguna yang sedang aktif pada client saat ini |
| /user/post | GET | 13521078 | untuk memperoleh data _post_ yang telah dibuat oleh user |
| /user | PATCH | 13521078 | untuk mengubah data user yang aktif pada client saat ini |
| /user | DELETE | 13521092 | untuk menghapus akun pengguna yang sedang aktif pada client saat ini |

POST Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /post | GET | 13521092 | untuk memperoleh data lengkap suatu post |
| /post | POST | 13521078 | untuk membuat sebuah _post_ |
| /post/user | GET | 13521078 | untuk memperoleh data user pada suatu post tertentu |
| /post/resources | GET | 13521092 | untuk memperoleh media lainnya dari post seperti gambar, video, audio, dll. |
| /post/replies | GET | 13521057 | untuk memperoleh data _post_ yang merupakan reply pada _post_ lainnya |
| /post/replies | POST | 13521057 | untuk membuat _reply_ pada sebuah _post_ |
| /post/fyp | GET | 13521092 | untuk memperoleh _post-post_ terbaru |

Like Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /likes | GET | 13521057 | untuk memperoleh data banyak _like_ pada suatu _post_ |
| /likes | PATCH | 13521057 | untuk menambahkan data _like_ pada suatu _post_ |
| /likes | DELETE | 13521057 | untuk menghapus data _like_ pada suatu _post_ |

Follow Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /followings | GET | 13521092 | untuk memperoleh data pengguna yang di-_follow_ seorang pengguna |
| /followers | GET | 13521092 | untuk memperoleh data pengguna yang mem-_follow_ seorang pengguna |
| /follow | GET | 13521092 | untuk memastikan apakah pengguna saat ini mem-_follow_ seorang pengguna lainnya |
| /follow | POST | 13521078 | untuk menambahkan data _follow_ oleh pengguna saat ini yang mem-_follow_ seorang pengguna lainnya |
| /follow | DELETE | 13521078 | untuk menghapus data _follow_ oleh pengguna saat ini yang mem-_follow_ seorang pengguna lainnya |

Block Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /blocks | GET | 13521078 | untuk memperoleh data-data pengguna yang di-_block_ oleh seorang pengguna |
| /block | GET | 13521092 | untuk memperoleh status _block_ antara pengguna saat ini dengan seorang pengguna lainnya |
| /block | POST | 13521078 | untuk menambahkan data _block_ antara pengguna saat ini dengan seorang pengguna lainnya |
| /block | DELETE | 13521092 | untuk menghapus data _block_ antara pengguna saat ini dengan seorang pengguna lainnya |

Authentication Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /login | POST | 13521057 | untuk melakukan login dan memperoleh jwt token |
| /register | POST | 13521057 | untuk menambahkan akun baru |
| /forgot-password | PATCH | 13521078 | untuk memperbarui password sebuah akun |

Post Reports Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /post-reports | GET | 13521057 | untuk memperoleh laporan-laporan terhadap post |
| /post-reports/status | PATCH | 13521057 | untuk memperbarui status dari laporan |
| /forgot-password | PATCH | 13521078 | untuk memperbarui password sebuah akun |

User Reports Endpoints
| Endpoint | Method | NIM | DESKRIPSI |
|----------|--------|----------|-----|
| /user-reports | GET | 13521057 | untuk memperoleh laporan-laporan terhadap user |
| /user-reports/status | PATCH | 13521057 | untuk memperbarui status dari laporan |
| /forgot-password | PATCH | 13521078 | untuk memperbarui password sebuah akun |

### Pembagian Tugas
| NIM | Tugas |
| --- | --- |
| 13521057 | post reports endpoints, user reports endpoints, blocks endpoints, auth endpoints, beberapa user endpoints, post reply endpoints, beberapa follow endpoints |
| 13521078 | ... |
| 13521092 | ... |
