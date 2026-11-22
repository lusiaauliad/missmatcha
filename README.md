# Miss Matcha 🍵
**Authentic Pure Matcha in Semarang**

Website pemesanan resmi Miss Matcha untuk pelanggan di Semarang. Dilengkapi katalog menu minuman matcha, keranjang belanja, integrasi pembayaran QRIS, dan konfirmasi pemesanan otomatis via WhatsApp.

---

## 🚀 Cara Mempublikasikan (Deploy ke GitHub Pages)

Website ini sudah siap dipublikasikan secara gratis menggunakan **GitHub Pages**:

1. **Push perubahan terbaru ke GitHub**:
   ```bash
   git push origin main
   ```
2. **Aktifkan GitHub Pages**:
   - Buka repositori Anda di GitHub: `https://github.com/lusiaauliad/missmatcha`
   - Klik menu **Settings** > **Pages** (di sidebar kiri).
   - Pada bagian **Build and deployment** > **Source**:
     - Pilih **GitHub Actions** (otomatis menggunakan workflow `.github/workflows/deploy.yml`), ATAU
     - Pilih **Deploy from a branch** > branch **main** / **/(root)** > klik **Save**.
3. Website Anda akan aktif dan bisa diakses di:
   👉 **`https://lusiaauliad.github.io/missmatcha/`**

---

## 🛍️ Alur Checkout Pelanggan

1. Pelanggan membuka website dan memilih menu (**Matcha Latte**, **Matcha Strawberry**, **Matcha Choco**, atau **Matcha Ube**).
2. Pelanggan dapat mengatur **Sugar Level** & **Ice Level**, lalu klik **Add to Cart**.
3. Di keranjang belanja, klik **Proceed to Checkout**.
4. Pelanggan mengisi:
   - Nama Lengkap
   - Nomor WhatsApp
   - Metode Pengambilan: **Pickup (Ambil Sendiri)** atau **Delivery (Diantar ke Alamat)**
   - Alamat Pengiriman (jika memilih Delivery)
   - Catatan Pesanan (opsional)
5. Klik **Lanjut ke Pembayaran QRIS**:
   - Muncul kode QRIS pembayaran beserta tombol **Unduh QRIS untuk Bayar di HP** (memudahkan bayar via GoPay, BCA, ShopeePay, dll).
   - Terdapat **ID Pesanan unik** (contoh: `#MM-248102`).
6. Klik **Konfirmasi via WhatsApp**:
   - Membuka chat WhatsApp resmi Miss Matcha dengan rincian pesanan yang sudah terformat rapi dan otomatis.

---

## ⚙️ Pengaturan & Kustomisasi

- **Nomor WhatsApp Admin**: Ubah konstanta `WHATSAPP` di baris pertama [script.js](script.js).
- **Gambar QRIS**: Ganti file [images/qris.png](images/qris.png) dengan gambar QRIS resmi dari bank/e-wallet Anda.
