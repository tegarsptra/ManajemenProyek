// Data wisata
const wisataData = [
  {
    id: 1,
    nama: "Lawang Sewu",
    lokasi: "Pusat Kota Semarang",
    deskripsi: "Bangunan bersejarah dengan arsitektur kolonial Belanda.",
    gambar: "img/lawangsewu.jpg"
  },
  {
    id: 2,
    nama: "Kota Lama",
    lokasi: "Semarang Utara",
    deskripsi: "Kawasan heritage dengan bangunan tempo dulu.",
    gambar: "img/kotalama.jpg"
  },
  {
    id: 3,
    nama: "Sam Poo Kong",
    lokasi: "Gedung Batu",
    deskripsi: "Kelenteng bersejarah tempat persinggahan Laksamana Cheng Ho.",
    gambar: "img/sampookong.jpg"
  },
  {
    id: 4,
    nama: "Masjid Agung Jawa Tengah (MAJT)",
    lokasi: "Gayamsari",
    deskripsi: "Masjid megah dengan payung otomatis seperti di Masjid Nabawi.",
    gambar: "img/majt.jpg"
  }
];

// Render kartu di index.html
const cardContainer = document.getElementById("cardContainer");
if (cardContainer) {
  cardContainer.innerHTML = wisataData.map(w => `
    <div class="card">
      <img src="${w.gambar}" alt="${w.nama}">
      <h3>${w.nama}</h3>
      <p>${w.lokasi}</p>
      <button onclick="showDetail(${w.id})">Lihat Detail</button>
    </div>
  `).join('');
}

// Simpan ke localStorage dan arahkan ke detail.html
function showDetail(id) {
  const wisata = wisataData.find(w => w.id === id);
  localStorage.setItem("selectedWisata", JSON.stringify(wisata));
  window.location.href = "detail.html";
}

// Tampilkan detail di halaman detail.html
const detailContainer = document.getElementById("detailContainer");
if (detailContainer) {
  const wisata = JSON.parse(localStorage.getItem("selectedWisata"));
  if (wisata) {
    detailContainer.innerHTML = `
      <div class="detail-content">
        <h2>${wisata.nama}</h2>
        <img src="${wisata.gambar}" alt="${wisata.nama}" class="detail-img">
        <p><strong>Lokasi:</strong> ${wisata.lokasi}</p>
        <p>${wisata.deskripsi}</p>
      </div>
    `;
  } else {
    detailContainer.innerHTML = `<p>Data tidak ditemukan. Silakan kembali ke <a href="index.html">beranda</a>.</p>`;
  }
}
