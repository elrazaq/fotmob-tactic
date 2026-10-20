# ⚽ Prototype Fotmob Tactic // Ver. 1.0

> **Advanced Broadcast Football Tactical Motion Studio & Prediction Engine**  
> Didesain khusus untuk football pundit & content creator untuk membuat grafis taktik siaran berkualitas tinggi dan video animasi (.mov) secara instan.

---

## ✨ Fitur Utama

- 🌐 **Dynamic Match Fetcher (Zero-CORS):**
  - Mengambil data pertandingan langsung dari URL FotMob mana pun via built-in Python proxy server.
  - Otomatis mengekstrak Starting 11, posisi pemain, pelatih, foto profil, rating pertandingan, statistik lengkap, dan daftar skuad.
- 📋 **Mode Siaran Ganda:**
  - **Mode Prediksi:** Bebas meracik formasi taktik, drag & drop pemain manual, geser formasi masal (D-Pad), serta auto-mapping ke formasi populer (4-3-3, 4-2-3-1, 3-4-2-1, dll.).
  - **Mode Review Laga:** Menampilkan posisi riil susunan pemain resmi pertandingan dari data FotMob.
- 🏟️ **Tampilan Lapangan Adaptif & Tab Lengkap:**
  - **Line Up AB (Bersanding):** Tampilan lapangan horizontal 2 tim sekaligus dengan warna jersey dominan masing-masing tim.
  - **Line Up Single (Tim A / Tim B):** Tampilan lapangan vertikal dengan safe-padding kiper dan kartu spotlight pelatih/pemain.
  - **Statistik Match:** Statistik mendalam (possession, xG, shots, corners, tackles, dll.) tanpa scrollbar yang mengganggu.
  - **Daftar Skuad & Jadwal Pertandingan:** Detail lengkap seluruh pemain terdaftar beserta venue pertandingan.
- 🎨 **Tema Visual & Spotlight Dinamis:**
  - Skema warna bertaraf siaran profesional dengan tema Luxury Arsenal Crimson & Gold.
  - Pilihan tema background kartu: *Obsidian Dark Glass*, *Emerald Pitch Glow*, *Midnight Navy*, *Pundit Crimson Carbon*, dan *Champagne Gold*.
  - Layer animasi bergelombang (*flowing wave texture layer*) yang elegan dan dinamis.
- 🎬 **True Broadcast Video Exporter (.MOV):**
  - Merekam canvas resolusi Full HD 1080p (30 FPS).
  - Dilengkapi animasi entrance memantul (*elastic bounce*), pergerakan gelombang latar, foto wajah pemain asli, pelat nomor punggung, lencana rating bintang, dan transisi *Fade In / Fade Out*.
  - Menghasilkan file video broadcast `.mov` utuh berukuran multi-megabyte siap pakai di Adobe Premiere, DaVinci Resolve, Final Cut Pro, atau CapCut.

---

## 🚀 Cara Menjalankan

### Cara Cepat (Satu Klik):
Cukup jalankan file:
```cmd
start_studio.bat
```
Script ini akan:
1. Menjalankan server lokal Python (`server.py`) di port `8000`.
2. Mengaktifkan proxy otomatis untuk bypass CORS & proteksi anti-bot FotMob.
3. Membuka aplikasi secara otomatis di browser default Anda di `http://localhost:8000/`.

---

## 🛠️ Struktur Project

```text
fotmob/
├── index.html              # Antarmuka Studio Siaran (Broadcast UI)
├── app.js                  # Engine Taktik, Animasi GSAP & MediaRecorder Exporter
├── styles.css              # Styling Tema Broadcast & Layout Lapangan
├── server.py               # Built-in Proxy Server & Dynamic FotMob API
├── presets.js              # Cache preset pertandingan
├── start_studio.bat        # Launcher satu klik Windows
├── assets/                 # Aset grafis (stadium background, wave texture)
└── data/                   # Data sampel pertandingan FotMob
```

---

## 📄 Lisensi
Hak Cipta © 2026. Dibuat untuk kebutuhan analisis taktik sepak bola & siaran pandit.
