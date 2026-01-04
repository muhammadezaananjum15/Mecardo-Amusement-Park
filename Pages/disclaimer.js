const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});

const faders = document.querySelectorAll('.fade-up');
const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px',
};
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach((fader) => appearOnScroll.observe(fader));
