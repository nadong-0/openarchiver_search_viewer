const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const capsLockWarning = document.getElementById('caps-lock-warning');
const translate = window.t || ((key) => key);

function updateCapsLockWarning(event) {
  const isPasswordFocused = document.activeElement === passwordInput;
  const isCapsLockOn = event.getModifierState && event.getModifierState('CapsLock');
  capsLockWarning.classList.toggle('visible', Boolean(isPasswordFocused && isCapsLockOn));
}

passwordInput.addEventListener('keydown', updateCapsLockWarning);
passwordInput.addEventListener('keyup', updateCapsLockWarning);
passwordInput.addEventListener('blur', () => {
  capsLockWarning.classList.remove('visible');
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = passwordInput.value;
  const errorMsg = document.getElementById('error-message');
  const btn = document.getElementById('login-button');

  errorMsg.textContent = '';
  btn.disabled = true;
  btn.textContent = translate('checking');

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      window.location.href = '/';
    } else {
      const data = await res.json().catch(() => ({}));
      errorMsg.textContent = data.detail || translate('invalidPassword');
    }
  } catch (err) {
    errorMsg.textContent = translate('networkError');
  } finally {
    btn.disabled = false;
    btn.textContent = translate('loginButton');
  }
});
