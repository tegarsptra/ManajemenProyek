// ===========================
// 📍 Daftar Data Wisata
// ===========================
const wisataList = [
  {
    nama: "Lawang Sewu",
    lokasi: "Pusat Kota Semarang",
    deskripsi: "Gedung bersejarah peninggalan Belanda yang menjadi ikon Semarang.",
    gambar: "img/lawangsewu.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.068302491584!2d110.40908407499172!3d-7.004576570660853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4f6a8f1b3d%3A0x8e7ef5b15fefc6e!2sLawang%20Sewu!5e0!3m2!1sid!2sid!4v1700000000000"
  },
  {
    nama: "Kota Lama",
    lokasi: "Semarang Utara",
    deskripsi: "Kawasan heritage dengan bangunan kolonial klasik dan spot foto estetik.",
    gambar: "img/kotalama.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.004070795915!2d110.42284517499173!3d-7.010278470664575"
  },
  {
    nama: "Sam Poo Kong",
    lokasi: "Gedung Batu",
    deskripsi: "Klenteng bersejarah tempat persinggahan Laksamana Cheng Ho.",
    gambar: "img/sampookong.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.3542541129993!2d110.39273437499153!3d-6.981348570645569"
  },
  {
    nama: "Masjid Agung Jawa Tengah (MAJT)",
    lokasi: "Gayamsari",
    deskripsi: "Masjid megah dengan arsitektur perpaduan Jawa, Arab, dan modern.",
    gambar: "img/majt.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.959002915978!2d110.45179837499165!3d-7.014002070667501"
  },
  {
    nama: "Brown Canyon",
    lokasi: "Tembalang",
    deskripsi: "Tebing bekas galian tanah yang kini jadi spot foto alam keren.",
    gambar: "img/browncanyon.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.523344038483!2d110.46616237499164!3d-7.052570570692589"
  }
];

// ===========================
// 🏞️ Halaman Utama
// ===========================
const container = document.getElementById("cardContainer");

if (container) {
  function tampilkanWisata(list) {
    container.innerHTML = "";
    list.forEach((w) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${w.gambar}" alt="${w.nama}">
        <h3>${w.nama}</h3>
        <p>${w.lokasi}</p>
        <button onclick='lihatDetail(${JSON.stringify(w).replace(/"/g, "&quot;")})'>Lihat Detail</button>
      `;
      container.appendChild(card);
    });
  }

  // 🔍 Fitur Pencarian
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const hasil = wisataList.filter(
        (w) =>
          w.nama.toLowerCase().includes(keyword) ||
          w.lokasi.toLowerCase().includes(keyword)
      );
      tampilkanWisata(hasil);
    });
  }

  // 🎯 Rekomendasi Acak
  window.showRandom = function () {
    const random = wisataList[Math.floor(Math.random() * wisataList.length)];
    alert(`🎯 Rekomendasi kamu: ${random.nama}`);
  };

  // 🔗 Navigasi ke Detail
  window.lihatDetail = function (wisata) {
    localStorage.setItem("selectedWisata", JSON.stringify(wisata));
    window.location.href = "detail.html";
  };

  // Jalankan
  tampilkanWisata(wisataList);
}

// ===========================
// 📖 Halaman Detail
// ===========================
const detailContainer = document.getElementById("detailContainer");
if (detailContainer) {
  const wisata = JSON.parse(localStorage.getItem("selectedWisata"));
  if (wisata) {
    detailContainer.innerHTML = `
      <div class="detail-card">
        <h2>${wisata.nama}</h2>
        <img src="${wisata.gambar}" alt="${wisata.nama}" class="detail-img">
        <p>${wisata.deskripsi}</p>
        <h4>📍 Lokasi: ${wisata.lokasi}</h4>
        <iframe src="${wisata.maps}" width="100%" height="300" style="border:0;" allowfullscreen></iframe>
      </div>
    `;
  } else {
    detailContainer.innerHTML = `
      <p>⚠️ Data wisata tidak ditemukan. Silakan kembali ke halaman utama.</p>
      <a href="index.html" class="back-btn">⬅ Kembali</a>
    `;
  }
}
