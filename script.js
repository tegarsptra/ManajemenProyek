// ===============================
// 📍 DATA WISATA SEMARANG
// ===============================
const wisataList = [
  {
    nama: "Lawang Sewu",
    lokasi: "Pusat Kota Semarang",
    deskripsi: "Gedung bersejarah peninggalan Belanda yang menjadi ikon Semarang.",
    gambar: "lawangsewu.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.068302491584!2d110.40908407499172!3d-7.004576570660853"
  },
  {
    nama: "Kota Lama",
    lokasi: "Semarang Utara",
    deskripsi: "Kawasan heritage dengan bangunan kolonial klasik dan spot foto estetik.",
    gambar: "kotalama.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.004070795915!2d110.42284517499173!3d-7.010278470664575"
  },
  {
    nama: "Sam Poo Kong",
    lokasi: "Gedung Batu",
    deskripsi: "Klenteng bersejarah tempat persinggahan Laksamana Cheng Ho.",
    gambar: "sampookong.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.3542541129993!2d110.39273437499153!3d-6.981348570645569"
  },
  {
    nama: "Masjid Agung Jawa Tengah (MAJT)",
    lokasi: "Gayamsari",
    deskripsi: "Masjid megah dengan arsitektur perpaduan Jawa, Arab, dan modern.",
    gambar: "majt.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.959002915978!2d110.45179837499165!3d-7.014002070667501"
  },
  {
    nama: "Brown Canyon",
    lokasi: "Tembalang",
    deskripsi: "Tebing bekas galian tanah yang kini jadi spot foto alam keren.",
    gambar: "browncanyon.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.523344038483!2d110.46616237499164!3d-7.052570570692589"
  }
];

// ===============================
// 🌆 HALAMAN UTAMA (index.html)
// ===============================
const container = document.getElementById("cardContainer");

if (container) {
  // Fungsi menampilkan daftar wisata
  function tampilkanWisata(list) {
    container.innerHTML = "";
    list.forEach((w, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${w.gambar}" alt="${w.nama}">
        <h3>${w.nama}</h3>
        <p>${w.lokasi}</p>
        <button class="detail-btn" data-index="${i}">Lihat Detail</button>
      `;
      container.appendChild(card);
    });

    // Tambahkan event listener setelah elemen dibuat
    const tombolDetail = document.querySelectorAll(".detail-btn");
    tombolDetail.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        lihatDetail(wisataList[index]);
      });
    });
  }

  // Pencarian
  document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const hasil = wisataList.filter(
      (w) =>
        w.nama.toLowerCase().includes(keyword) ||
        w.lokasi.toLowerCase().includes(keyword)
    );
    tampilkanWisata(hasil);
  });

  // Rekomendasi acak
  function showRandom() {
    const random = wisataList[Math.floor(Math.random() * wisataList.length)];
    alert(`🎯 Rekomendasi kamu: ${random.nama}`);
  }
  window.showRandom = showRandom;

  // Pindah ke halaman detail
  function lihatDetail(wisata) {
    localStorage.setItem("selectedWisata", JSON.stringify(wisata));
    window.location.href = "detail.html";
  }

  // Jalankan pertama kali
  tampilkanWisata(wisataList);
}

// ===============================
// 🏝️ HALAMAN DETAIL (detail.html)
// ===============================
const detailContainer = document.getElementById("detailContainer");

if (detailContainer) {
  const wisata = JSON.parse(localStorage.getItem("selectedWisata"));

  if (wisata) {
    detailContainer.innerHTML = `
      <h2>${wisata.nama}</h2>
      <img src="${wisata.gambar}" alt="${wisata.nama}" class="detail-img">
      <p>${wisata.deskripsi}</p>
      <h4>📍 Lokasi: ${wisata.lokasi}</h4>
      <iframe src="${wisata.maps}" width="100%" height="300" style="border:0;" allowfullscreen></iframe>
    `;
  } else {
    detailContainer.innerHTML = `
      <p style="text-align:center; color:red;">
        ⚠️ Data wisata tidak ditemukan.<br>
        Silakan kembali ke <a href="index.html">halaman utama</a>.
      </p>
    `;
  }
}
