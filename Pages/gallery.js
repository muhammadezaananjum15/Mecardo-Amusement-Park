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

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = card.querySelector('img').src;
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
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