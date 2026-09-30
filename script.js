const SIGNUP_KEY = 'bubblesViennaFormspreeSignup';
// Set this to the public endpoint from your Formspree dashboard.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwlpznnj';
const DEFAULT_COUNT = 23;
const TOTAL = 30;

const grids = document.querySelectorAll('[data-circle-grid]');
const countEls = document.querySelectorAll('[data-count]');
const remainingEls = document.querySelectorAll('[data-remaining]');
const form = document.getElementById('signupForm');
const waitingState = document.getElementById('waitingState');
const formMessage = document.getElementById('formMessage');

function getCount() {
  // Manually maintained; Formspree does not supply a public signup count.
  return DEFAULT_COUNT;
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
  let signedUp = false;
  try { signedUp = localStorage.getItem(SIGNUP_KEY) === 'true'; } catch (_) {}
  if (signedUp) {
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

let submitting = false;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (submitting) return;
  if (!validateForm()) { form.reportValidity(); return; }
  if (!FORMSPREE_ENDPOINT) {
    formMessage.textContent = 'Signups are not available yet. Please check back soon.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  const originalLabel = button.innerHTML;
  submitting = true;
  button.disabled = true;
  button.textContent = 'Sending...';
  form.setAttribute('aria-busy', 'true');
  formMessage.textContent = '';
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      formMessage.textContent = 'Your signup could not be accepted. Please try again shortly.';
      return;
    }
    // Storage is optional: a browser restriction must not hide a successful signup.
    try { localStorage.setItem(SIGNUP_KEY, 'true'); } catch (_) {}
    form.hidden = true;
    waitingState.hidden = false;
    document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
  } catch (_) {
    formMessage.textContent = 'We could not confirm your signup. Please check your connection and try again.';
  } finally {
    submitting = false;
    button.disabled = false;
    button.innerHTML = originalLabel;
    form.removeAttribute('aria-busy');
  }
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
