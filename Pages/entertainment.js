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