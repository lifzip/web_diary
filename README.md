# Judul proyek
## all about you online diary ##
aplikasi diary jurnal online pribadi yang aman minimalis dan modern proyek ini dibangun menggunakan nextjs app router dan terintegrasi dengan supabase untuk manajemen basis data serta autentikasi pengguna tanpa menggunakan email murni berbasis username dan password

# Fitur utama
1. Logika autentikasi tanpa email
sistem masuk login dan pendaftaran register aman menggunakan kombinasi unik username dan kata sandi bebas dari masalah rate limit email provider
2. Performa cepat
dibangun dengan nextjs server actions dan server components untuk pemrosesan data yang optimal langsung di sisi server
3. Tampilan modern dan responsif
desain grid kartu diary yang estetik dilengkapi pratinjau teks otomatis line-clamp efek kartu melayang hover effect dan skema warna yang ramah mata
4. Keamanan berlapis
proteksi bawaan terhadap serangan sql injection sqli dan cross site scripting xss baik melalui filter regex di sisi klien maupun sanitasi string di sisi server
5. Crud diary
manajemen penuh untuk membuat melihat memperbarui edit dengan validasi asinkron dan menghapus catatan harian secara instan

# Teknologi yang digunakan
1. Framework nextjs 15 plus react 19 app router
2. Database dan auth supabase postgresql dan supabase auth
3. Styling css modules scoping lokal agar komponen rapi
4. Bahasa typescript atau javascript

# Keamanan aplikasi

aplikasi ini mengimplementasikan aturan validasi ketat untuk menjaga keamanan data pengguna
1. Username dan nama hanya menerima karakter alfanumerik dan underscore menolak tag html tanda kurung siku atau skrip injeksi berbahaya
2. Kata sandi diwajibkan memiliki panjang minimal 8 karakter dengan kombinasi wajib huruf besar huruf kecil angka serta simbol seperti karakter spesial
3. Sanitasi server semua input teks dibersihkan menggunakan metode konversi ke html entities sebelum dikirim ke backend supabase untuk mencegah serangan xss presisten
