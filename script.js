// =============================
// Data Wisata (bisa disesuaikan)
// =============================
const wisataList = [
  {
    nama: "Lawang Sewu",
    lokasi: "Jl. Pemuda, Semarang",
    deskripsi: "Bangunan bersejarah peninggalan Belanda yang ikonik di Semarang.",
    gambar: "lawangsewu.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.223266248832!2d110.4115790747316!3d-7.000960394948274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b517e0ef9f9%3A0xb0cfcbe4200fbd17!2sLawang%20Sewu!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
  },
  {
    nama: "Kota Lama",
    lokasi: "Jl. Letjen Suprapto, Semarang",
    deskripsi: "Kawasan bersejarah dengan bangunan Belanda klasik dan spot foto menarik.",
    gambar: "kotalama.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.167216090874!2d110.42671307473167!3d-7.007562394943493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b32a13291d3%3A0xe3b1817eae81bdf3!2sKota%20Lama%20Semarang!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid"
  },
  {
    nama: "Sam Poo Kong",
    lokasi: "Jl. Simongan, Semarang",
    deskripsi: "Kelenteng bersejarah dengan arsitektur khas Tiongkok yang megah.",
    gambar: "sampookong.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.242057719276!2d110.39207417473146!3d-6.998724794950203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708acb29ebef59%3A0x8ff5ebd38b2237f3!2sSam%20Poo%20Kong!5e0!3m2!1sid!2sid!4v1700000000002!5m2!1sid!2sid"
  },
  {
    nama: "Masjid Agung Jawa Tengah",
    lokasi: "Jl. Gajah Raya, Semarang",
    deskripsi: "Masjid megah dengan arsitektur modern dan menara tinggi yang menawan.",
    gambar: "majt.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.179694729149!2d110.44106697473152!3d-7.006078794944613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b89a5f4f2cb%3A0xf2ecf65f2f06e1d4!2sMasjid%20Agung%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1700000000003!5m2!1sid!2sid"
  },
  {
    nama: "Brown Canyon",
    lokasi: "Tembalang, Semarang",
    deskripsi: "Kawasan bekas galian yang kini menjadi spot foto alam yang unik.",
    gambar: "browncanyon.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.973509764693!2d110.46023487473177!3d-7.02741139492793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70e96b4d7b567f%3A0x28b8337a7f187bf2!2sBrown%20Canyon!5e0!3m2!1sid!2sid!4v1700000000004!5m2!1sid!2sid"
  }
];

// =============================
// Render daftar wisata di index.html
// =============================
function tampilkanWisata(list) {
  const container = document.getElementById("wisataContainer");
  if (!container) return;

  container.innerHTML = "";

  list.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card fade-in";
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}">
      <h3>${item.nama}</h3>
      <p>${item.lokasi}</p>
      <a href="detail.html?nama=${encodeURIComponent(item.nama)}" class="btn">Lihat Detail</a>
    `;
    container.appendChild(card);
  });
}

// =============================
// Fitur Pencarian Wisata
// =============================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const hasil = wisataList.filter(
      (w) =>
        w.nama.toLowerCase().includes(keyword) ||
        w.lokasi.toLowerCase().includes(keyword)
    );
    tampilkanWisata(hasil);
  });
}

// =============================
// Fitur Rekomendasi Wisata Acak
// =============================
const btnAcak = document.getElementById("btnAcak");
if (btnAcak) {
  btnAcak.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * wisataList.length);
    const wisata = wisataList[randomIndex];
    alert(`🎉 Rekomendasi Wisata: ${wisata.nama}\n📍 Lokasi: ${wisata.lokasi}`);
  });
}

// =============================
// Halaman Detail (menampilkan data dan peta)
// =============================
const params = new URLSearchParams(window.location.search);
const namaWisata = params.get("nama");
if (namaWisata) {
  const data = wisataList.find((w) => w.nama === namaWisata);
  if (data) {
    document.getElementById("detailNama").textContent = data.nama;
    document.getElementById("detailLokasi").textContent = data.lokasi;
    document.getElementById("detailDeskripsi").textContent = data.deskripsi;
    document.getElementById("detailGambar").src = data.gambar;
    document.getElementById("detailMap").src = data.map;
  }
}

// =============================
// Efek animasi fade-in saat muncul
// =============================
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".fade-in");
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, i * 150);
  });
});
