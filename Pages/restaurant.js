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

function openBooking(dish) {
  document.getElementById('bookingModal').style.display = 'flex';
  document.getElementById('dishName').innerText = dish;
}

function closeBooking() {
  document.getElementById('bookingModal').style.display = 'none';
  alert('Order placed successfully!');
}

function rate(star) {
  let stars = star.parentElement.children;
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove('active');
  }
  for (let i = 0; i <= [...stars].indexOf(star); i++) {
    stars[i].classList.add('active');
  }
}
// Modal
function selectSeat(seat) {
  if (seat.classList.contains('reserved')) return;

  document.querySelectorAll('.seat').forEach((s) => s.classList.remove('selected'));

  seat.classList.add('selected');
}

function selectSeat(seat) {
  if (seat.classList.contains('reserved')) return;

  document.querySelectorAll('.seat').forEach((s) => s.classList.remove('selected'));

  seat.classList.add('selected');
}
