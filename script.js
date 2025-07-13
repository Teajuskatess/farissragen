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