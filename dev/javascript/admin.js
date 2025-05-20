// Verificar el estado de sesión y el rol del usuario en el panel de administración
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('sessionUser'));

  if (!user || user.rol !== 'administrador') {
    alert('Acceso denegado. Debes iniciar sesión como administrador.');
    window.location.href = '/dev/index.html';
  }
});

// Función para cerrar sesión (puedes llamarla desde un botón con onclick="logout()")
function logout() {
  localStorage.removeItem('sessionUser');
  alert("Sesión cerrada.");
  window.location.href = '/dev/index.html';
}
