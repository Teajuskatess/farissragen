const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Toggle menu
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('show');
  overlay.classList.toggle('show');
});

// Close menu on overlay click
overlay.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  navLinks.classList.remove('show');
  overlay.classList.remove('show');
});

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(slide => slide.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}


window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(function() {
      var loader = document.getElementById('loader');
      if(loader) loader.style.display = 'none';
    }, 500);
  });

// Efek hover: tampilkan gradient & nama kegiatan saat cursor didekatkan ke gambar kegiatan
document.querySelectorAll('.slide').forEach(slide => {
  slide.addEventListener('mouseenter', function () {
    this.classList.add('active');
  });
  slide.addEventListener('mouseleave', function () {
    this.classList.remove('active');
  });
});

// Helper: format jam
function pad(n){return n<10?'0'+n:n;}

// Data waktu sholat Sragen (contoh, update sesuai kebutuhan)
const jadwalSholat = [
  {nama:'Subuh', jam:'04:30'},
  {nama:'Dzuhur', jam:'11:50'},
  {nama:'Ashar', jam:'15:10'},
  {nama:'Maghrib', jam:'17:35'},
  {nama:'Isya', jam:'18:45'}
];

// Fungsi cari sholat terdekat
function getSholatTerdekat(now) {
  const today = now.toISOString().slice(0,10);
  for (let i=0; i<jadwalSholat.length; i++) {
    let [h,m] = jadwalSholat[i].jam.split(':');
    let waktuSholat = new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,m,0);
    if (now < waktuSholat) {
      return {nama:jadwalSholat[i].nama, waktu:waktuSholat};
    }
  }
  // Jika sudah lewat semua, ambil subuh besok
  let [h,m] = jadwalSholat[0].jam.split(':');
  let waktuSholat = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,h,m,0);
  return {nama:jadwalSholat[0].nama, waktu:waktuSholat};
}

// Animasi logic
let mode = 0; // 0: hari/tanggal, 1: jam, 2: countdown, 3: semua
let lastFlip = Date.now();

function updateInfoSholat() {
  const now = new Date();
  const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][now.getDay()];
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][now.getMonth()];
  const tanggal = `${pad(now.getDate())} ${bulan} ${now.getFullYear()}`;
  const jam = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sholat = getSholatTerdekat(now);
  const countdownMs = sholat.waktu - now;
  const cdJam = Math.floor(countdownMs/1000/60/60);
  const cdMenit = Math.floor((countdownMs/1000/60)%60);
  const cdDetik = Math.floor((countdownMs/1000)%60);
  const countdownStr = `Menuju ${sholat.nama}: ${pad(cdJam)}:${pad(cdMenit)}:${pad(cdDetik)}`;

  // Isi flip card hanya pada front
  document.getElementById('hariTanggalFront').textContent = `${hari}, ${tanggal}`;
  document.getElementById('jamFront').textContent = jam;
  document.getElementById('countdownFront').textContent = countdownStr;

  // Animasi mode
  const hariTanggal = document.getElementById('hariTanggal');
  const jamSekarang = document.getElementById('jamSekarang');
  const countdownSholat = document.getElementById('countdownSholat');
  hariTanggal.style.display = 'none';
  jamSekarang.style.display = 'none';
  countdownSholat.style.display = 'none';

  if (mode === 0) { // Hari/tanggal
    hariTanggal.style.display = '';
  } else if (mode === 1) { // Jam
    jamSekarang.style.display = '';
  } else if (mode === 2) { // Countdown
    countdownSholat.style.display = '';
  } else if (mode === 3) { // Semua
    hariTanggal.style.display = '';
    jamSekarang.style.display = '';
    countdownSholat.style.display = '';
  }
}

// Mode timer
function animasiLoop() {
  const now = Date.now();
  let durasi = [5000, 10000, 5000, 300000]; // 5s, 10s, 5s, 5m
  if (now - lastFlip > durasi[mode]) {
    mode = (mode+1)%4;
    lastFlip = now;
  }
  updateInfoSholat();
  setTimeout(animasiLoop, 1000); // update setiap detik agar countdown real-time
}
animasiLoop();

