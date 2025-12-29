
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

const btns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.filter-item');

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    items.forEach((item) => {
      item.style.display = filter === 'all' || item.classList.contains(filter) ? 'block' : 'none';
    });
  });
});
