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
// ====================================================================
// ================= LOGIN =================
function login() {
  let name = document.getElementById("loginName").value.trim();
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  let namePattern = /^[A-Za-z ]+$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    alert("❌ Name is required");
    return;
  }

  if (!namePattern.test(name)) {
    alert('❌ Invalid name. Only alphabets and spaces are allowed');
    return;
  }

  if (email === "") {
    alert("❌ Email is required");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("❌ Invalid email format");
    return;
  }

  if (password === "") {
    alert("❌ Password is required");
    return;
  }

  if (password.length < 6) {
    alert("❌ Password must be at least 6 characters");
    return;
  }

  alert("✅ Login Successful! Welcome " + name + " 🎉");
}


// ================= SIGNUP =================
function signup() {
  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("signupPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let namePattern = /^[A-Za-z ]+$/;
  let phonePattern = /^[0-9]{10,15}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    alert("❌ Name is required");
    return;
  }

  if (!namePattern.test(name)) {
    alert("❌ Invalid name. Only alphabets and spaces are allowed");
    return;
  }

  if (email === "") {
    alert("❌ Email is required");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address");
    return;
  }

  if (phone === "") {
    alert("❌ Phone number is required");
    return;
  }

  if (!phonePattern.test(phone)) {
    alert("❌ Phone number must be 10-15 digits");
    return;
  }

  if (password.length < 6) {
    alert("❌ Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Your Password do not match");
    return;
  }

  alert("🎉 Account successfully created!");
}