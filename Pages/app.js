const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

/* OPEN MENU */
function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  hamburger.classList.add('hide');
}

/* CLOSE MENU */
function closeMenuHandler() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('hide');
}

/* EVENTS */
hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuHandler);
overlay.addEventListener('click', closeMenuHandler);
