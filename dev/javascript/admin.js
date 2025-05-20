// Verificar el estado de sesión y el rol del usuario en el panel de administración
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('sessionUser'));

  if (!user || user.rol !== 'administrador') {
    alert('Acceso denegado. Debes iniciar sesión como administrador.');
    window.location.href = '/index.html'; // Ruta corregida
  }
});

// Función para cerrar sesión (llamada desde el botón)
function logout() {
  localStorage.removeItem('sessionUser');
  alert("Sesión cerrada.");
  window.location.href = '/index.html'; // Ruta corregida
}
