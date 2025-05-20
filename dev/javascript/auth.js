(() => {
  const loginBtn = document.getElementById('login-btn');
  const profileBtn = document.getElementById('profile-btn');
  const greeting = document.getElementById('greeting');

  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));

  if (sessionUser) {
    if (greeting) greeting.textContent = `Hola, ${sessionUser.name}`;
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'inline-block';
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = '/dev/views/logpage.html';
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
      if (sessionUser && sessionUser.rol === 'administrador') {
        window.location.href = '/dev/views/admin.html';
      } else {
        window.location.href = '/dev/views/profile.html';
      }
    });
  }

  // Registro de usuarios
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const contraseña = document.getElementById('contraseña').value;
      const rol = document.getElementById('rol').value;

      const newUser = { name: nombre, email: correo, password: contraseña, rol };

      let users = JSON.parse(localStorage.getItem('users')) || [];

      const userExists = users.find(u => u.email === correo);
      if (userExists) {
        alert('Ya existe un usuario registrado con ese correo.');
        return;
      }

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      registerForm.reset();
    });
  }

  // Inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('correoLogin').value;
      const contraseña = document.getElementById('contraseñaLogin').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === correo && u.password === contraseña);

      if (user) {
        localStorage.setItem('sessionUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso');

        if (user.rol === 'administrador') {
          window.location.href = '/dev/views/admin.html';
        } else {
          window.location.href = '/dev/views/home.html';
        }
      } else {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
})();
