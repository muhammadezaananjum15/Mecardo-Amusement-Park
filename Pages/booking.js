
// ===================== BOOKING SYSTEM =====================
const panels = document.querySelectorAll('.panel');
const steps = document.querySelectorAll('.steps span');

const passType = document.getElementById('passType');
const dateInput = document.getElementById('date');

const qtyEls = {
  adult: document.getElementById('adult'),
  child: document.getElementById('child'),
  senior: document.getElementById('senior'),
  family: document.getElementById('family'),
};

const prices = {
  adult: 49,
  child: 25,
  senior: 35,
  family: 159,
};

const subtotalEl = document.getElementById('subtotal');
const payBtn = document.querySelector('.pay');

const cardSection = document.getElementById('cardDetailsSection');
const qrSection = document.getElementById('qrCodeSection');
const qrContainer = document.getElementById('qrContainer');

const paymentStatus = document.getElementById('paymentStatus');
const paymentMessage = document.getElementById('paymentMessage');

const addonCards = document.querySelectorAll('.addon-card');
const promoInput = document.getElementById('promoCode');
const applyPromoBtn = document.getElementById('applyPromo');

let currentStep = 0;
let promoDiscount = 0;

const VALID_CARD = {
  number: '7391826405173928',
  cvv: '1947',
};

// ===================== INIT =====================
showPanel(currentStep);
updateTotal();
qrSection.style.display = 'none';
paymentStatus.style.display = 'none';

// ===================== PANEL CONTROL =====================
function showPanel(index) {
  panels.forEach((p, i) => p.classList.toggle('active', i === index));
  steps.forEach((s, i) => s.classList.toggle('active', i === index));
}

// ===================== VALIDATIONS =====================
function validateVisitorDetails() {
  const panel = panels[2];

  const name = panel.querySelector('#name')?.value.trim();
  const email = panel.querySelector('#email')?.value.trim();
  const phone = panel.querySelector('#phone')?.value.trim();

  const namePattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10,15}$/;

  if (!name || !email || !phone) {
    alert('❌ Please fill all visitor details');
    return false;
  }

  if (!namePattern.test(name)) {
    alert('❌ Invalid name. Only alphabets and spaces are allowed');
    return false;
  }

  if (!emailPattern.test(email)) {
    alert('❌ Invalid email format');
    return false;
  }

  if (!phonePattern.test(phone)) {
    alert('❌ Invalid phone number. It should contain only digits (10-15 characters)');
    return false;
  }

  return true;
}

function validateCardDetails() {
  const number = document.getElementById('cardNumber').value.replace(/\s+/g, '');
  const cvv = document.getElementById('cardCVV').value;
  const expiry = document.getElementById('cardExpiry').value;

  if (!number || !cvv || !expiry) {
    alert('❌ Please fill all card details');
    return false;
  }

  if (!/^\d{16}$/.test(number)) {
    alert('❌ Card number must be 16 digits');
    return false;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    alert('❌ Invalid CVV');
    return false;
  }

  if (number !== VALID_CARD.number || cvv !== VALID_CARD.cvv) {
    alert('❌ Invalid card credentials');
    return false;
  }

  return true;
}

function validateBeforePayment() {
  if (parseFloat(subtotalEl.innerText) <= 0) {
    alert('❌ Please select at least one ticket');
    return false;
  }

  if (!document.querySelector('input[name="pay"]:checked')) {
    alert('❌ Please select a payment method');
    return false;
  }

  return true;
}

// ===================== NAVIGATION =====================
document.querySelectorAll('.next').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentStep === 2 && !validateVisitorDetails()) return;
    if (currentStep < panels.length - 1) {
      currentStep++;
      showPanel(currentStep);
      updateTotal();
    }
  });
});

document.querySelectorAll('.back').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showPanel(currentStep);
      updateTotal();
    }
  });
});

// ===================== QUANTITY =====================
document.querySelectorAll('.qty button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.t;
    const action = btn.dataset.a;
    let val = parseInt(qtyEls[type].innerText);

    if (action === 'inc') val++;
    if (action === 'dec' && val > 0) val--;

    qtyEls[type].innerText = val;
    updateTotal();
  });
});

// ===================== ADDONS =====================
addonCards.forEach((card) => {
  const input = card.querySelector('input');
  card.addEventListener('click', () => {
    input.checked = !input.checked;
    card.classList.toggle('selected', input.checked);
    updateTotal();
  });
});

// ===================== PROMO =====================
applyPromoBtn.addEventListener('click', () => {
  const code = promoInput.value.trim().toLowerCase();
  promoDiscount = 0;

  if (code === 'mercado20') promoDiscount = 20;
  else if (code === 'funday10') promoDiscount = 10;
  else alert('❌ Invalid promo code');

  if (promoDiscount > 0) alert(`✅ Promo applied: $${promoDiscount} off`);
  updateTotal();
});

// ===================== TOTAL =====================
passType.addEventListener('change', updateTotal);
dateInput.addEventListener('change', updateTotal);

function updateTotal() {
  let multiplier = 1;
  const date = new Date(dateInput.value);

  if (passType.value === 'auto' && !isNaN(date)) {
    multiplier = date.getDay() === 0 || date.getDay() === 6 ? 1.5 : 1;
  } else if (passType.value === 'weekend') multiplier = 1.5;
  else if (passType.value === 'holiday') multiplier = 2;

  let ticketTotal =
    qtyEls.adult.innerText * prices.adult * multiplier +
    qtyEls.child.innerText * prices.child * multiplier +
    qtyEls.senior.innerText * prices.senior * multiplier +
    qtyEls.family.innerText * prices.family * multiplier;

  let addonsTotal = 0;
  addonCards.forEach((card) => {
    if (card.querySelector('input').checked) {
      addonsTotal += parseInt(card.querySelector('input').value);
    }
  });

  let finalTotal = Math.max(0, ticketTotal + addonsTotal - promoDiscount);

  subtotalEl.innerText = finalTotal.toFixed(2);
  document.getElementById('total2').innerText = finalTotal.toFixed(2);
  document.getElementById('pAddons').innerText = addonsTotal.toFixed(2);
  document.getElementById('pPromo').innerText = promoDiscount.toFixed(2);
}

// ===================== PAYMENT =====================
document.querySelectorAll('input[name="pay"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    paymentStatus.style.display = 'none';

    if (radio.value === 'card') {
      cardSection.style.display = 'block';
      qrSection.style.display = 'none';
    } else {
      cardSection.style.display = 'none';
      qrSection.style.display = 'block';
      generateQRCode();
    }
  });
});

function generateQRCode() {
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: 'MercadoAmusementPay',
    width: 150,
    height: 150,
  });
}

payBtn.addEventListener('click', () => {
  if (!validateBeforePayment()) return;

  const method = document.querySelector('input[name="pay"]:checked').value;

  if (method === 'card' && !validateCardDetails()) return;

  paymentStatus.style.display = 'flex';
  paymentStatus.classList.remove('success');
  paymentMessage.innerText = method === 'qr' ? 'Waiting for payment...' : 'Processing payment...';

  setTimeout(completeBooking, method === 'qr' ? 6000 : 2000);
});

function completeBooking() {
  paymentStatus.classList.add('success');
  paymentMessage.innerText = 'Payment Successful!';

  document.getElementById('final').innerText = subtotalEl.innerText;
  document.getElementById('userEmail').innerText = document.getElementById('email').value;

  // ✅ ADD THIS
  sessionStorage.setItem('bookingDone', 'true');

  currentStep++;
  showPanel(currentStep);
}
