// Old Garage - File JavaScript Utama
// Hanya 2 fungsi sederhana untuk tugas Web 1

// 1. Tombol menu untuk layar HP
var tombolMenu = document.getElementById("tombolMenu");
var menuUtama = document.getElementById("menuUtama");

tombolMenu.addEventListener("click", function () {
  // Tampilkan / sembunyikan menu
  menuUtama.classList.toggle("tampil");
});

// 2. Tutup menu otomatis setelah salah satu link diklik (di HP)
var semuaLink = menuUtama.getElementsByTagName("a");
for (var i = 0; i < semuaLink.length; i++) {
  semuaLink[i].addEventListener("click", function () {
    menuUtama.classList.remove("tampil");
  });
}

// 3. Tulis tahun otomatis di footer
document.getElementById("tahun").textContent = new Date().getFullYear();

// 4. Interaksi dasar formulir konsultasi (tanpa backend)
//    Hanya jalan di halaman konsultasi.html
var formKonsultasi = document.getElementById("formKonsultasi");
if (formKonsultasi) {
  var infoFoto = document.getElementById("infoFoto");
  var inputFoto = document.getElementById("foto");
  var pesanHasil = document.getElementById("pesanHasil");

  // Tampilkan nama file yang dipilih
  inputFoto.addEventListener("change", function () {
    if (inputFoto.files.length > 0) {
      infoFoto.textContent = "Foto dipilih: " + inputFoto.files[0].name;
    } else {
      infoFoto.textContent = "Belum ada foto dipilih.";
    }
  });

  // Saat tombol Kirim diklik: cegah reload, tampilkan ringkasan
  formKonsultasi.addEventListener("submit", function (ac) {
    ac.preventDefault();
    var nama = document.getElementById("nama").value;
    var jenis = document.getElementById("jenis").value;
    pesanHasil.textContent =
      "Terima kasih " + nama + "! Data konsultasi untuk motor " + jenis +
      " sudah tercatat. Kami akan menghubungi Anda via WhatsApp.";
    formKonsultasi.reset();
    infoFoto.textContent = "Belum ada foto dipilih.";
  });
}

// 5. Interaksi dasar formulir kontak (tanpa backend)
//    Hanya jalan di halaman kontak.html
var formKontak = document.getElementById("formKontak");
if (formKontak) {
  formKontak.addEventListener("submit", function (ac) {
    ac.preventDefault();
    var namaKontak = document.getElementById("namaKontak").value;
    document.getElementById("pesanTerkirim").textContent =
      "Terima kasih " + namaKontak + "! Pesan Anda sudah tercatat. Kami akan membalas secepatnya.";
    formKontak.reset();
  });
}

// 6. Chatbot Old Garage
// Fitur: tombol buka/tutup, pesan pembuka, pertanyaan cepat, dan jawaban sederhana

var tombolChat = document.getElementById("tombolChat");
var kotakChat = document.getElementById("kotakChat");
var formChat = document.getElementById("formChat");
var inputChat = document.getElementById("teksChat");
var areaChat = document.getElementById("areaChat");
var semuaPilihan = document.getElementById("pilihanChat").getElementsByTagName("button");

var chatTerbuka = false;
var sudahGreet = false;

// 6.1 Buka / tutup kotak chat
tombolChat.addEventListener("click", function () {
  chatTerbuka = !chatTerbuka;
  if (chatTerbuka) {
    kotakChat.classList.add("tampil");
    // Tampilkan pesan pembuka hanya pada pertama kali chat dibuka
    if (!sudahGreet) {
      tampilkanPesan("bot", "Halo! Selamat datang di Old Garage. Saya asisten virtual Old Garage. Ada yang ingin ditanyakan tentang motor atau layanan kami?");
      sudahGreet = true;
    }
  } else {
    kotakChat.classList.remove("tampil");
  }
});

// 6.2 Tampilkan pesan di area chat
function tampilkanPesan(pengirim, teks, linkLabel, linkUrl) {
  var bubble = document.createElement("div");
  bubble.className = "bubble-chat " + pengirim;
  bubble.innerHTML = teks;
  if (pengirim === "bot" && linkLabel) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.textContent = linkLabel;
    bubble.appendChild(link);
  }
  areaChat.appendChild(bubble);
  areaChat.scrollTop = areaChat.scrollHeight;
}

// 6.3 Kirim pertanyaan dan tampilkan jawabannya
function kirimPertanyaan(teks) {
  var pertanyaan = teks.trim();
  if (pertanyaan === "") {
    return;
  }
  // Tampilkan pertanyaan sebagai pesan user
  tampilkanPesan("user", pertanyaan);
  // Bersihkan input
  inputChat.value = "";
  // Ambil jawaban berdasarkan kata kunci
  var jawaban = dapatkanJawaban(pertanyaan);
  // Tampilkan jawaban sebagai pesan bot
  tampilkanPesan("bot", jawaban.teks, jawaban.linkLabel, jawaban.linkUrl);
}

// 6.4 Proses submit form chat (tombol Kirim)
formChat.addEventListener("submit", function (e) {
  e.preventDefault();
  kirimPertanyaan(inputChat.value);
});

// 6.5 Bisa juga kirim dengan menekan tombol Enter
inputChat.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    kirimPertanyaan(inputChat.value);
  }
});

// 6.6 Tombol pilihan pertanyaan cepat
for (var i = 0; i < semuaPilihan.length; i++) {
  semuaPilihan[i].addEventListener("click", function () {
    kirimPertanyaan(this.getAttribute("data-teks"));
  });
}

// 6.7 Fungsi mencari jawaban berdasarkan teks pertanyaan
function dapatkanJawaban(teks) {
  var t = teks.toLowerCase();

  // Pertanyaan tentang layanan
  if (t.indexOf("layanan") > -1 || t.indexOf("servis") > -1) {
    return {
      teks: "Old Garage menyediakan layanan restorasi penuh, perbaikan mesin, perbaikan body, dan modifikasi untuk motor tua atau klasik. Restorasi mencakup rangka, body, kelistrikan, dan cat akhir.",
      linkLabel: "Lihat Halaman Layanan",
      linkUrl: "layanan.html"
    };
  }

  // Pertanyaan tentang restorasi
  if (t.indexOf("restorasi") > -1) {
    return {
      teks: "Ya, Old Garage melayani restorasi motor tua atau klasik. Prosesnya meliputi rangka, body, kelistrikan, dan cat akhir. Contoh proyek: Honda CB 100/125.",
      linkLabel: "Lihat Halaman Proyek",
      linkUrl: "proyek.html"
    };
  }

  // Pertanyaan tentang modifikasi
  if (t.indexOf("modifikasi") > -1) {
    return {
      teks: "Ya, Old Garage dapat melakukan modifikasi motor tua atau klasik sesuai keinginan, dengan tetap mempertahankan karakter motor.",
      linkLabel: "",
      linkUrl: ""
    };
  }

  // Pertanyaan tentang perbaikan mesin
  if (t.indexOf("mesin") > -1) {
    return {
      teks: "Ya, Old Garage dapat melakukan perbaikan dan perawatan mesin motor klasik.",
      linkLabel: "Isi Form Konsultasi",
      linkUrl: "konsultasi.html"
    };
  }

  // Pertanyaan tentang konsultasi
  if (t.indexOf("konsultasi") > -1) {
    return {
      teks: "Untuk berkonsultasi, silakan isi form konsultasi. Ceritakan kondisi motor Anda, termasuk jenis motor, tahun, dan keluhan. Kami akan membantu perkiraka biaya dan waktunya.",
      linkLabel: "Isi Form Konsultasi",
      linkUrl: "konsultasi.html"
    };
  }

  // Pertanyaan tentang harga / biaya
  if (t.indexOf("harga") > -1 || t.indexOf("biaya") > -1) {
    return {
      teks: "Old Garage tidak menyimpan informasi harga di website ini. Untuk perkiraan biaya restorasi, perbaikan, atau modifikasi, silakan isi form konsultasi terlebih dahulu.",
      linkLabel: "Isi Form Konsultasi",
      linkUrl: "konsultasi.html"
    };
  }

  // Pertanyaan tentang lokasi, jam operasional, atau cara menghubungi
  if (t.indexOf("lokasi") > -1 || t.indexOf("alamat") > -1 || t.indexOf("jam") > -1 || t.indexOf("whatsapp") > -1 || t.indexOf("kontak") > -1 || t.indexOf("hubung") > -1 || t.indexOf("bengkel") > -1) {
    return {
      teks: "Anda dapat menghubungi Old Garage melalui WhatsApp atau dengan datang ke bengkel. Jam operasional: Senin – Sabtu, 09.00 – 17.00.",
      linkLabel: "Lihat Halaman Kontak",
      linkUrl: "kontak.html"
    };
  }

  // Pertanyaan tentang merek atau jenis motor tertentu
  if (t.indexOf("merek") > -1 || t.indexOf("brand") > -1) {
    return {
      teks: "Untuk merek atau jenis motor tertentu yang belum dijelaskan, pertanyaan dapat dirujuk ke layanan restorasi, perbaikan, atau modifikasi. Old Garage fokus pada motor tua dan klasik.",
      linkLabel: "",
      linkUrl: ""
    };
  }

  // Pertanyaan di luar topik chatbot
  return {
    teks: "Maaf, saya asisten Old Garage. Saya dapat membantu pertanyaan seputar motor, restorasi, perbaikan, modifikasi, dan layanan bengkel.",
    linkLabel: "",
    linkUrl: ""
  };
}

var formKonsultasi = document.getElementById("formKonsultasi");

if (formKonsultasi) {
  formKonsultasi.addEventListener("submit", function (event) {
    event.preventDefault();

    var pesan = document.getElementById("pesanHasil");
    var tombol = formKonsultasi.querySelector('button[type="submit"]');

    var data = new URLSearchParams({
      nama: document.getElementById("nama").value,
      wa: document.getElementById("wa").value,
      jenis: document.getElementById("jenis").value,
      tahunMotor: document.getElementById("tahunMotor").value,
      kondisi: document.getElementById("kondisi").value,
      layanan: formKonsultasi.querySelector(
        'input[name="layanan"]:checked'
      ).value,
      deskripsi: document.getElementById("deskripsi").value
    });

    tombol.disabled = true;
    pesan.textContent = "Mengirim konsultasi...";

    fetch("https://script.google.com/macros/s/AKfycbyy-ps4e_6fhgo0w0o2WU1GrN8ZXk92Vfa2IiHoZU9LEb7aec5big0en2qmB_hKeER5/exec", {
      method: "POST",
      mode: "no-cors",
      body: data
    })
    .then(function () {
      pesan.textContent =
        "Permintaan dikirim. Periksa konfirmasi melalui bengkel.";
      formKonsultasi.reset();
    })
    .catch(function () {
      pesan.textContent =
        "Pengiriman gagal. Silakan coba lagi.";
    })
    .finally(function () {
      tombol.disabled = false;
    });
  });
}
