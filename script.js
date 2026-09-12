const STORAGE_KEY = 'bubblesJoinedCount';
const SIGNUP_KEY = 'bubblesSignedUp';
const startingCount = 1284;

const joinedCountEl = document.getElementById('joinedCount');
const bubbleLayer = document.getElementById('bubbleLayer');
const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');
const emailInput = document.getElementById('email');

function getSavedCount() {
  const value = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(value) && value > 0 ? value : startingCount;
}

function setJoinedCount(nextValue) {
  const safeValue = Math.max(0, Math.round(nextValue));
  localStorage.setItem(STORAGE_KEY, String(safeValue));
  joinedCountEl.textContent = new Intl.NumberFormat().format(safeValue);
}

function animateJoinedCount() {
  const current = getSavedCount();
  const target = current + 6;
  setJoinedCount(target);
}

function createBubble() {
  const bubble = document.createElement('span');
  const size = Math.random() * 80 + 24;
  const left = Math.random() * 100;
  const duration = Math.random() * 12 + 10;
  const delay = Math.random() * -12;
  const opacity = Math.random() * 0.4 + 0.2;

  bubble.className = 'bubble';
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.bottom = `${-size}px`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.opacity = String(opacity);

  bubbleLayer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, duration * 1000 + 1500);
}

function seedBubbles() {
  const total = 22;
  for (let index = 0; index < total; index += 1) {
    setTimeout(createBubble, index * 180);
  }
}

function updateWeeklyCounter() {
  const current = getSavedCount();
  setJoinedCount(current);
  setInterval(() => {
    animateJoinedCount();
  }, 12000);
}

function persistSignup(email) {
  const stored = JSON.parse(localStorage.getItem(SIGNUP_KEY) || '[]');
  const safeList = Array.isArray(stored) ? stored : [];
  const normalised = email.trim().toLowerCase();

  if (!safeList.includes(normalised)) {
    safeList.push(normalised);
    localStorage.setItem(SIGNUP_KEY, JSON.stringify(safeList));
  }
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.classList.remove('success', 'error');
  if (type) {
    formMessage.classList.add(type);
  }
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    showMessage('Please enter a valid email to join the experiment.', 'error');
    emailInput.focus();
    return;
  }

  const currentCount = getSavedCount();
  const updatedCount = currentCount + 1;
  setJoinedCount(updatedCount);
  persistSignup(email);

  signupForm.reset();
  showMessage('You are in. Welcome to the Bubbles experiment.', 'success');
});

window.addEventListener('load', () => {
  const existingCount = getSavedCount();
  setJoinedCount(existingCount);
  updateWeeklyCounter();
  seedBubbles();
  setInterval(createBubble, 900);

  const signedUp = localStorage.getItem(SIGNUP_KEY);
  if (signedUp) {
    const list = JSON.parse(signedUp);
    if (Array.isArray(list) && list.length > 0) {
      showMessage(`Already tracking ${list.length} early member${list.length === 1 ? '' : 's'}.`, 'success');
    }
  }
});
