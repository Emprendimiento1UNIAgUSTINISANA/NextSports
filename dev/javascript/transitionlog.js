const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

showRegister.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
    showRegister.parentElement.style.display = 'none';
    showLogin.parentElement.style.display = 'flex';
});

showLogin.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    showRegister.parentElement.style.display = 'flex';
    showLogin.parentElement.style.display = 'none';
});

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    localStorage.setItem('user', JSON.stringify({ name, email }));
    window.location.href = '/dev/views/home.html';
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('login-name').value;
    const email = document.getElementById('login-email').value;
    localStorage.setItem('user', JSON.stringify({ name, email }));
    window.location.href = '/dev/views/home.html';
});