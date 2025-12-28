// =======================
// ELEMENT REFERENCES
// =======================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const qtyInput = document.getElementById('qty'); // Make sure your qty input has id="qty"

const foodTitle = document.getElementById('foodTitle');
const bookingModal = document.getElementById('bookingModal');
const cartItems = document.getElementById('cartItems');

let cart = [];
let selectedItem = {};

// =======================
// MOBILE MENU HANDLERS
// =======================
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

// =======================
// BOOKING HANDLERS
// =======================
function openBooking(name, price) {
  selectedItem = { name, price };
  foodTitle.innerText = name;
  bookingModal.style.display = 'flex';
}

function closeBooking() {
  bookingModal.style.display = 'none';
}

// Add booking to cart
function confirmBooking() {
  const booking = {
    ...selectedItem,
    qty: qtyInput.value,
    date: dateInput.value,
    time: timeInput.value,
    name: nameInput.value,
    phone: phoneInput.value,
  };

  // Validate required fields
  if (!booking.name || !booking.phone || !booking.date || !booking.time || !booking.qty) {
    alert('Please fill in all fields!');
    return;
  }

  cart.push(booking);
  renderCart();
  closeBooking();
  clearBookingForm();
}

// Render cart items
function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
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

// Clear form inputs after booking
function clearBookingForm() {
  nameInput.value = '';
  phoneInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  qtyInput.value = 1;
}
