
// Manejar el inicio de sesión del administrador
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar el envío del formulario

  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // Verificar las credenciales (puedes cambiar esto según tu lógica)
  if (username === 'admin' && password === 'admin123') {
    // Guardar el estado de sesión en localStorage
    localStorage.setItem('admin', JSON.stringify({ username }));
    window.location.href = '/dev/views/admin.html'; // Redirigir al panel de administración
  } else {
    alert('Credenciales incorrectas. Inténtalo de nuevo.');
  }
});
