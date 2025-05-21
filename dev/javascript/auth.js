/**
 * Sistema de autenticación mejorado para NextSports
 * Usa localStorage para almacenar y gestionar usuarios
 */
(() => {
  // Referencias a elementos comunes de la interfaz
  const loginBtn = document.getElementById('login-btn');
  const profileBtn = document.getElementById('profile-btn');
  const greeting = document.getElementById('greeting');

  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));

  // Actualizar UI según estado de autenticación
  if (sessionUser) {
    if (greeting) greeting.textContent = `Hola, ${sessionUser.name}`;
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'inline-block';
  } else {
    if (greeting) greeting.textContent = `Hola, Invitado`;
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (profileBtn) profileBtn.style.display = 'none';
  }

  // Configurar botones de navegación
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
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const contraseña = document.getElementById('contraseña').value;
      const rol = document.getElementById('rol').value;

      // Validaciones
      if (nombre.length < 3) {
        alert('El nombre debe tener al menos 3 caracteres');
        return;
      }

      if (!validarEmail(correo)) {
        alert('Por favor, introduce un correo electrónico válido');
        return;
      }

      if (contraseña.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      const newUser = { 
        name: nombre, 
        email: correo, 
        password: contraseña, 
        rol,
        fecha_creacion: new Date().toISOString(),
        telefono: '',
        direccion: ''
      };

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
      
      // Redirigir al login o mostrar la pestaña de login
      const showLoginTab = document.getElementById('show-login');
      if (showLoginTab) {
        showLoginTab.click();
      }
    });
  }
  
  /**
   * Valida un correo electrónico
   * @param {string} email - Correo a validar
   * @returns {boolean} true si es válido
   */
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  // Inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('correoLogin').value.trim();
      const contraseña = document.getElementById('contraseñaLogin').value;

      // Validación básica
      if (!correo || !contraseña) {
        alert('Por favor, complete todos los campos');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === correo && u.password === contraseña);

      if (user) {
        // Añadir timestamp de inicio de sesión
        const sessionData = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('sessionUser', JSON.stringify(sessionData));
        
        // Redirigir según el rol del usuario
        if (user.rol === 'administrador') {
          window.location.href = '/dev/views/admin.html';
        } else {
          window.location.href = '/dev/views/home.html';
        }
      } else {
        // Comprobar si el correo existe para dar un mensaje más específico
        const emailExists = users.some(u => u.email === correo);
        if (emailExists) {
          alert('Contraseña incorrecta');
        } else {
          alert('No existe una cuenta con este correo');
        }
      }
    });
  }
  
  // Recuperación de contraseña
  const forgotPasswordLink = document.getElementById('forgot-password');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Mostrar formulario de recuperación (si existe)
      if (forgotPasswordForm) {
        loginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
      } else {
        // Si no hay formulario, usar un prompt
        const email = prompt('Introduce tu correo electrónico para recuperar tu contraseña:');
        if (email && validarEmail(email)) {
          recuperarContraseña(email);
        } else if (email) {
          alert('Por favor, introduce un correo electrónico válido');
        }
      }
    });
  }
  
  // Procesar formulario de recuperación si existe
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('recovery-email').value.trim();
      
      if (validarEmail(email)) {
        recuperarContraseña(email);
        
        // Volver al formulario de login
        forgotPasswordForm.style.display = 'none';
        loginForm.style.display = 'block';
      } else {
        alert('Por favor, introduce un correo electrónico válido');
      }
    });
  }
  
  /**
   * Simula recuperación de contraseña
   * @param {string} email - Correo del usuario
   */
  function recuperarContraseña(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
      // En un sistema real, se enviaría un correo con un enlace de recuperación
      // Aquí simulamos mostrando la contraseña (solo para demo)
      alert(`En un sistema real, se enviaría un correo a ${email} con instrucciones para recuperar la contraseña.\n\nPara esta demo, tu contraseña es: ${user.password}`);
    } else {
      alert(`Si existe una cuenta asociada a ${email}, recibirás un correo con instrucciones para recuperar tu contraseña.`);
    }
  }
  
  // Cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('sessionUser');
      alert('Sesión cerrada correctamente');
      window.location.href = '/index.html';
    });
  }
})();
