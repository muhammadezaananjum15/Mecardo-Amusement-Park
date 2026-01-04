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
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-up').forEach((el) => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  const showCards = document.querySelectorAll('.show-card');
  showCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
  const characterCards = document.querySelectorAll('.character-card');
  characterCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });
  console.log('Entertainment page loaded successfully');
});
