/* =========================
   ELEMENT REFERENCES
========================= */
const panels = document.querySelectorAll('.panel');
const steps = document.querySelectorAll('.steps span');

const passType = document.getElementById('passType');
const qtyEls = {
  adult: document.getElementById('adult'),
  child: document.getElementById('child'),
  senior: document.getElementById('senior'),
  family: document.getElementById('family'),
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

const dateInput = document.getElementById('date');

/* =========================
   GLOBAL STATE
========================= */
let currentStep = 0;
let promoDiscount = 0;

/* =========================
   PRICES
========================= */
const prices = {
  adult: 49,
  child: 25,
  senior: 35,
  family: 159,
};

/* =========================
   INITIAL UI STATE
========================= */
showPanel(currentStep);
updateTotal();

qrSection.style.display = 'none';
paymentStatus.style.display = 'none';

/* =========================
   STEP NAVIGATION
========================= */
function showPanel(index) {
  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === index);
  });

  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

document.querySelectorAll('.next').forEach((btn) => {
  btn.addEventListener('click', () => {
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

/* =========================
   QUANTITY CONTROLS
========================= */
document.querySelectorAll('.qty button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.t;
    const action = btn.dataset.a;

    let value = parseInt(qtyEls[type].innerText);

    if (action === 'inc') value++;
    if (action === 'dec' && value > 0) value--;

    qtyEls[type].innerText = value;
    updateTotal();
  });
});

/* =========================
   ADD-ONS
========================= */
addonCards.forEach((card) => {
  const input = card.querySelector('input');

  card.addEventListener('click', () => {
    input.checked = !input.checked;
    card.classList.toggle('selected', input.checked);
    updateTotal();
  });
});

/* =========================
   PROMO CODES
========================= */
applyPromoBtn.addEventListener('click', () => {
  const code = promoInput.value.trim().toLowerCase();

  promoDiscount = 0;

  if (code === 'mercado20') promoDiscount = 20;
  else if (code === 'funday10') promoDiscount = 10;
  else alert('Invalid promo code');

  if (promoDiscount > 0) {
    alert(`Promo applied: $${promoDiscount} off`);
  }

  updateTotal();
});

/* =========================
   PASS TYPE & DATE
========================= */
passType.addEventListener('change', updateTotal);
dateInput.addEventListener('change', updateTotal);

/* =========================
   TOTAL CALCULATION
========================= */
function updateTotal() {
  let multiplier = 1;
  const date = new Date(dateInput.value);

  if (passType.value === 'auto' && !isNaN(date)) {
    const day = date.getDay();
    multiplier = day === 0 || day === 6 ? 1.5 : 1;
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

  let finalTotal = ticketTotal + addonsTotal - promoDiscount;
  if (finalTotal < 0) finalTotal = 0;

  subtotalEl.innerText = finalTotal.toFixed(2);
  document.getElementById('total2').innerText = finalTotal.toFixed(2);
  document.getElementById('pAddons').innerText = addonsTotal.toFixed(2);
  document.getElementById('pPromo').innerText = promoDiscount.toFixed(2);
}

/* =========================
   PAYMENT METHOD TOGGLE
========================= */
document.querySelectorAll('input[name="pay"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    paymentStatus.style.display = 'none';

    if (radio.value === 'card') {
      cardSection.style.display = 'block';
      qrSection.style.display = 'none';
    }

    if (radio.value === 'qr') {
      cardSection.style.display = 'none';
      qrSection.style.display = 'block';
      generateQRCode();
    }
  });
});

/* =========================
   QR GENERATION
========================= */
function generateQRCode() {
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: 'MercadoAmusementPay',
    width: 150,
    height: 150,
  });
}

/* =========================
   PAYMENT PROCESS
========================= */
payBtn.addEventListener('click', () => {
  const payMethod = document.querySelector('input[name="pay"]:checked').value;

  paymentStatus.style.display = 'flex';
  paymentStatus.classList.remove('success');

  if (payMethod === 'qr') {
    paymentMessage.innerText = 'Waiting for payment...';
    setTimeout(completeBooking, 6000);
  } else {
    paymentMessage.innerText = 'Processing payment...';
    setTimeout(completeBooking, 2000);
  }
});

function completeBooking() {
  paymentStatus.classList.add('success');
  paymentMessage.innerText = 'Payment Successful!';

  document.getElementById('final').innerText = subtotalEl.innerText;
  document.getElementById('userEmail').innerText = document.getElementById('email').value;

  currentStep++;
  showPanel(currentStep);
}
