document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = index === slideIndex ? "block" : "none";
        });

        slideIndex = (slideIndex + 1) % slides.length; // Pindah ke slide berikutnya
        setTimeout(showSlides, 2000); // Ganti slide setiap 2 detik
    }

    showSlides();
});

document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    // Fungsi untuk menampilkan slide berdasarkan indeks
    function showSlide(index) {
        slideIndex = (index + slides.length) % slides.length; // Pastikan indeks valid
        slides.forEach((slide, i) => {
            slide.style.display = i === slideIndex ? "block" : "none";
        });
    }

    // Fungsi untuk mengubah slide
    function changeSlide(step) {
        showSlide(slideIndex + step);
    }

    // Tampilkan slide pertama
    showSlide(slideIndex);

    // Ekspor fungsi ke global agar tombol bisa memanggilnya
    window.changeSlide = changeSlide;
});

// Ambil tombol "Back to Top"
var mybutton = document.getElementById("scrollTopBtn");

// Ketika pengguna menggulir ke bawah 20px dari atas, tampilkan tombol
window.onscroll = function() {
    if (document.body.scrollTop > 1700 || document.documentElement.scrollTop > 1700) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

// Fungsi untuk menggulir halaman ke atas
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efek gulir halus
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
});

// Menambahkan event listener untuk hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Menambahkan event listener untuk klik pada hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

window.onload = function() {
    // Hide the loading overlay and show the content after the page is fully loaded
    document.querySelector('.loading-overlay').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
};

// Mendapatkan elemen body dan tombol toggle mode
const body = document.body;
const modeToggleButton = document.getElementById("modeToggle");

// Mengecek mode yang dipilih dan menambahkannya ke body
if(localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
} else {
    body.classList.add("light-mode");
}

// Fungsi untuk toggle mode
function toggleMode() {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    // Simpan preferensi mode di localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Menambahkan event listener ke tombol untuk mengganti mode
modeToggleButton.addEventListener("click", toggleMode);

// Menambahkan event listener untuk tombol toggle mode
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    // Toggle mode gelap dan terang pada body
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
