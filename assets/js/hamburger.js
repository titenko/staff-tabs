const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});

