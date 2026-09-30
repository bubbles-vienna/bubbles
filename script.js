const COUNT_KEY = 'bubblesViennaCount';
const SIGNUP_KEY = 'bubblesViennaSignup';
const DEFAULT_COUNT = 23;
const TOTAL = 30;

const grids = document.querySelectorAll('[data-circle-grid]');
const countEls = document.querySelectorAll('[data-count]');
const remainingEls = document.querySelectorAll('[data-remaining]');
const form = document.getElementById('signupForm');
const waitingState = document.getElementById('waitingState');
const formMessage = document.getElementById('formMessage');

function getCount() {
  const saved = localStorage.getItem(COUNT_KEY);
  const stored = Number(saved);
  return saved !== null && Number.isFinite(stored) && stored >= 0 && stored <= TOTAL ? stored : DEFAULT_COUNT;
}

function renderCount(count) {
  countEls.forEach((element) => { element.textContent = count; });
  remainingEls.forEach((element) => { element.textContent = Math.max(TOTAL - count, 0); });
  grids.forEach((grid) => {
    grid.innerHTML = '';
    for (let index = 0; index < TOTAL; index += 1) {
      const circle = document.createElement('span');
      circle.className = `circle${index < count ? ' filled' : ''}`;
      grid.appendChild(circle);
    }
  });
}

function showWaitingState() {
  if (localStorage.getItem(SIGNUP_KEY)) {
    form.hidden = true;
    waitingState.hidden = false;
  }
}

function validateForm() {
  const email = document.getElementById('email').value.trim();
  if (!form.checkValidity() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMessage.textContent = 'Please fill in the required fields with a valid email.';
    return false;
  }
  return true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) { form.reportValidity(); return; }
  const count = Math.min(getCount() + 1, TOTAL);
  localStorage.setItem(COUNT_KEY, String(count));
  localStorage.setItem(SIGNUP_KEY, 'true');
  renderCount(count);
  showWaitingState();
  document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('[data-share]').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const shareData = { title: 'Bubbles Vienna', text: '30 strangers. One city. One shared week.', url: window.location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else await navigator.clipboard.writeText(window.location.href);
    button.innerHTML = 'Link copied <span aria-hidden="true">&#10003;</span>';
  } catch (error) {
    if (error.name !== 'AbortError') button.innerHTML = 'Share Bubbles <span aria-hidden="true">&#8599;</span>';
  }
});

renderCount(getCount());
showWaitingState();
