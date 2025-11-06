console.log("✅ script.js berhasil dimuat!");

// Data wisata
const wisataData = [
  {
    id: 1,
    nama: "Lawang Sewu",
    lokasi: "Pusat Kota Semarang",
    deskripsi: "Bangunan bersejarah dengan arsitektur kolonial Belanda.",
    gambar: "lawangsewu.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.048360832024!2d110.41187897499856!3d-6.983768068403447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4b8964d66b%3A0x66ab1ffca3a1b06f!2sLawang%20Sewu!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
  },
  {
    id: 2,
    nama: "Kota Lama",
    lokasi: "Semarang Utara",
    deskripsi: "Kawasan heritage dengan bangunan tempo dulu.",
    gambar: "kotalama.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.001624381915!2d110.42633067499861!3d-6.987648668409695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b5cc5d0d4f9%3A0xe4d1b4a3ed62af5f!2sKota%20Lama%20Semarang!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid"
  },
  {
    id: 3,
    nama: "Sam Poo Kong",
    lokasi: "Gedung Batu",
    deskripsi: "Kelenteng bersejarah tempat persinggahan Laksamana Cheng Ho.",
    gambar: "sampookong.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.019178583761!2d110.38983617499867!3d-6.985970668406939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b92e6c2eb35%3A0xf45f39c279091e3f!2sKelenteng%20Sam%20Poo%20Kong!5e0!3m2!1sid!2sid!4v1700000000002!5m2!1sid!2sid"
  },
  {
    id: 4,
    nama: "Masjid Agung Jawa Tengah",
    lokasi: "Gayamsari",
    deskripsi: "Masjid megah dengan payung otomatis seperti di Masjid Nabawi.",
    gambar: "majt.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.870314962946!2d110.44937947499872!3d-6.999841368426836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b7096aa3e89%3A0x7c1f233b2228b94a!2sMasjid%20Agung%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1700000000003!5m2!1sid!2sid"
  },
  {
    id: 5,
    nama: "Brown Canyon",
    lokasi: "Tembalang",
    deskripsi: "Destinasi alam unik mirip Grand Canyon versi Semarang.",
    gambar: "browncanyon.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8610231996967!2d110.45548147499882!3d-7.00061286842798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7089b8367ce4e3%3A0x507816cd9c58e8a2!2sBrown%20Canyon!5e0!3m2!1sid!2sid!4v1700000000004!5m2!1sid!2sid"
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
      <a href="#" class="detail-btn" onclick="showDetail(${w.id})">Lihat Detail</a>
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
        <h3>📍 Lokasi di Peta:</h3>
        <div class="map-container">
          <iframe src="${wisata.maps}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    `;
  } else {
    detailContainer.innerHTML = `<p>Data tidak ditemukan. Silakan kembali ke <a href="index.html">beranda</a>.</p>`;
  }
}
