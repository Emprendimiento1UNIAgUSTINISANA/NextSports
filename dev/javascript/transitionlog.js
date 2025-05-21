document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const forgotPasswordForm = document.getElementById("forgot-password-form");
  
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const forgotPassword = document.getElementById("forgot-password");
  const backToLogin = document.getElementById("back-to-login");

  // Mostrar formulario de registro
  if (showRegister) {
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      registerForm.style.display = "block";
    });
  }

  // Mostrar formulario de login
  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      registerForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }
  
  // Mostrar formulario de recuperación de contraseña
  if (forgotPassword && forgotPasswordForm) {
    forgotPassword.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "none";
      forgotPasswordForm.style.display = "block";
    });
  }
  
  // Volver al formulario de login desde recuperación
  if (backToLogin && forgotPasswordForm) {
    backToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      forgotPasswordForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }
});
