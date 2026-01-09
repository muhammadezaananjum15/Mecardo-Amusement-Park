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