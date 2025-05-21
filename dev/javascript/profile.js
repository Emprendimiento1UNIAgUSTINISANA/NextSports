window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('sessionUser'));
    if (!user) {
      return window.location.href = '/dev/views/logpage.html';
    }
  
    document.querySelector('.profile-name').textContent = user.name;
    document.querySelector('.profile-email').textContent = user.email;
    
    // Si hay elementos para rol y fecha de registro, actualizarlos
    const roleElement = document.querySelector('.profile-role');
    if (roleElement) roleElement.textContent = `Rol: ${user.rol}`;
    
    const dateElement = document.querySelector('.profile-date');
    if (dateElement) {
      if (user.fecha_creacion) {
        dateElement.textContent = `Registrado el: ${new Date(user.fecha_creacion).toLocaleDateString('es-ES')}`;
      } else {
        // Si no hay fecha de creación, usar la fecha actual como ejemplo
        dateElement.textContent = `Registrado el: ${new Date().toLocaleDateString('es-ES')}`;
      }
    }
  });
  
  