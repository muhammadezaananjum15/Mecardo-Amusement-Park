const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const closeMenuBtn = document.getElementById('closeMenu');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const qtyInput = document.getElementById('qty');

const foodTitle = document.getElementById('foodTitle');
const bookingModal = document.getElementById('bookingModal');
const cartItems = document.getElementById('cartItems');

let cart = [];
let selectedItem = {};
function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  hamburger.classList.add('hide');
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('hide');
}
hamburger.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', closeMenu);
}
function openBooking(name, price) {
  selectedItem = { name, price };
  foodTitle.innerText = name;
  bookingModal.style.display = 'flex';
}

function closeBooking() {
  bookingModal.style.display = 'none';
}
function confirmBooking() {
  const booking = {
    ...selectedItem,
    qty: qtyInput.value,
    date: dateInput.value,
    time: timeInput.value,
    name: nameInput.value,
    phone: phoneInput.value,
  };

  if (!booking.name || !booking.phone || !booking.date || !booking.time || !booking.qty) {
    alert('Please fill in all fields!');
    return;
  }

  cart.push(booking);
  renderCart();
  closeBooking();
  clearBookingForm();
}

function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach((item) => {
    cartItems.innerHTML += `
      <p>
        <strong>${item.name}</strong><br>
        Qty: ${item.qty}<br>
        Date: ${item.date} | Time: ${item.time}<br>
        Phone: ${item.phone}
      </p>
      <hr>
    `;
  });
}

function clearBookingForm() {
  nameInput.value = '';
  phoneInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  qtyInput.value = 1;
}
