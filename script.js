console.log("✅ script.js berhasil dimuat!");

// Data wisata
const wisataData = [
  {
    id: 1,
    nama: "Lawang Sewu",
    lokasi: "Pusat Kota Semarang",
    deskripsi: "Bangunan bersejarah dengan arsitektur kolonial Belanda.",
    gambar: "lawangsewu.jpg"
  },
  {
    id: 2,
    nama: "Kota Lama",
    lokasi: "Semarang Utara",
    deskripsi: "Kawasan heritage dengan bangunan tempo dulu.",
    gambar: "kotalama.jpg"
  },
  {
    id: 3,
    nama: "Sam Poo Kong",
    lokasi: "Gedung Batu",
    deskripsi: "Kelenteng bersejarah tempat persinggahan Laksamana Cheng Ho.",
    gambar: "sampookong.jpg"
  },
  {
    id: 4,
    nama: "Masjid Agung Jawa Tengah",
    lokasi: "Gayamsari",
    deskripsi: "Masjid megah dengan payung otomatis seperti di Masjid Nabawi.",
    gambar: "majt.jpg"
  },
  {
    id: 5,
    nama: "Brown Canyon",
    lokasi: "Tembalang",
    deskripsi: "Destinasi alam unik mirip Grand Canyon versi Semarang.",
    gambar: "browncanyon.jpg"
  }
];

// Render kartu di halaman index.html
const cardContainer = document.getElementById("cardContainer");
if (cardContainer) {
  cardContainer.innerHTML = wisataData.map(w => `
    <div class="card">
      <img src="${w.gambar}" alt="${w.nama}" 
           onerror="this.src='https://via.placeholder.com/300x200?text=Gambar+Tidak+Ditemukan'">
      <h3>${w.nama}</h3>
      <p>${w.lokasi}</p>
      <button onclick="showDetail(${w.id})">Lihat Detail</button>
    </div>
  `).join('');

  // Fitur pencarian
  document.getElementById("searchInput").addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const hasil = wisataData.filter(w => 
      w.nama.toLowerCase().includes(keyword) || 
      w.lokasi.toLowerCase().includes(keyword)
    );
    cardContainer.innerHTML = hasil.map(w => `
      <div class="card">
        <img src="${w.gambar}" alt="${w.nama}" 
             onerror="this.src='https://via.placeholder.com/300x200?text=Gambar+Tidak+Ditemukan'">
        <h3>${w.nama}</h3>
        <p>${w.lokasi}</p>
        <button onclick="showDetail(${w.id})">Lihat Detail</button>
      </div>
    `).join('');
  });
}

// Simpan data wisata ke localStorage lalu buka halaman detail
function showDetail(id) {
  const wisata = wisataData.find(w => w.id === id);
  localStorage.setItem("selectedWisata", JSON.stringify(wisata));
  window.location.href = "detail.html";
}

// Rekomendasi acak
function showRandom() {
  const random = wisataData[Math.floor(Math.random() * wisataData.length)];
  alert(`🎯 Rekomendasi kamu: ${random.nama}`);
}

// Tampilkan detail di halaman detail.html
const detailContainer = document.getElementById("detailContainer");
if (detailContainer) {
  const wisata = JSON.parse(localStorage.getItem("selectedWisata"));
  if (wisata) {
    detailContainer.innerHTML = `
      <div class="detail-content">
        <h2>${wisata.nama}</h2>
        <img src="${wisata.gambar}" alt="${wisata.nama}" class="detail-img"
             onerror="this.src='https://via.placeholder.com/500x300?text=Gambar+Tidak+Ditemukan'">
        <p><strong>Lokasi:</strong> ${wisata.lokasi}</p>
        <p>${wisata.deskripsi}</p>
      </div>
    `;
  } else {
    detailContainer.innerHTML = `<p>Data tidak ditemukan. Silakan kembali ke <a href="index.html">beranda</a>.</p>`;
  }
}
