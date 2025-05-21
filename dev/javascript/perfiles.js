/**
 * Sistema de gestión de perfiles de usuario
 * Permite a los usuarios ver y editar su información personal
 */

const PerfilSystem = {
  /**
   * Carga los datos del usuario actual en el formulario de perfil
   * @param {string} formId - ID del formulario donde cargar los datos
   */
  cargarDatosUsuario: function(formId = 'profile-form') {
    const usuario = JSON.parse(localStorage.getItem('sessionUser'));
    if (!usuario) {
      console.error('No hay usuario autenticado');
      window.location.href = '/dev/views/logpage.html';
      return;
    }
    
    const form = document.getElementById(formId);
    if (!form) {
      console.error(`No se encontró el formulario con ID: ${formId}`);
      return;
    }
    
    // Rellenar los campos si existen
    if (form.elements['nombre']) form.elements['nombre'].value = usuario.name || '';
    if (form.elements['email']) form.elements['email'].value = usuario.email || '';
    if (form.elements['telefono']) form.elements['telefono'].value = usuario.telefono || '';
    if (form.elements['direccion']) form.elements['direccion'].value = usuario.direccion || '';
    
    // Mostrar información adicional si hay elementos para ello
    const nombreUsuarioElement = document.querySelector('.profile-name');
    if (nombreUsuarioElement) nombreUsuarioElement.textContent = usuario.name || 'Usuario';
    
    const emailUsuarioElement = document.querySelector('.profile-email');
    if (emailUsuarioElement) emailUsuarioElement.textContent = usuario.email || '';
    
    const rolUsuarioElement = document.querySelector('.profile-role');
    if (rolUsuarioElement) rolUsuarioElement.textContent = `Rol: ${usuario.rol || 'Usuario'}`;
    
    // Mostrar fecha de registro formateada
    const fechaRegistroElement = document.querySelector('.profile-date');
    if (fechaRegistroElement) {
      if (usuario.fecha_creacion) {
        const fecha = new Date(usuario.fecha_creacion);
        fechaRegistroElement.textContent = `Registrado el: ${fecha.toLocaleDateString('es-ES')}`;
      } else {
        fechaRegistroElement.textContent = 'Fecha de registro no disponible';
      }
    }
  },
  
  /**
   * Actualiza los datos del perfil de usuario
   * @param {Event} event - Evento de envío del formulario
   * @returns {boolean} false para prevenir envío normal del formulario
   */
  actualizarPerfil: function(event) {
    event.preventDefault();
    
    const form = event.target;
    const usuario = JSON.parse(localStorage.getItem('sessionUser'));
    
    if (!usuario) {
      alert('Debe iniciar sesión para actualizar su perfil');
      return false;
    }
    
    // Obtener valores del formulario
    const nuevosDatos = {
      name: form.elements['nombre']?.value.trim() || usuario.name,
      email: usuario.email, // El email no se cambia (es el identificador)
      telefono: form.elements['telefono']?.value.trim() || usuario.telefono || '',
      direccion: form.elements['direccion']?.value.trim() || usuario.direccion || '',
      // Mantener otros campos que no se actualizan
      password: usuario.password,
      rol: usuario.rol,
      fecha_creacion: usuario.fecha_creacion || new Date().toISOString()
    };
    
    // Validar contraseña si se está cambiando
    const passwordActual = form.elements['password-actual']?.value.trim();
    const passwordNuevo = form.elements['password-nuevo']?.value.trim();
    const passwordConfirm = form.elements['password-confirm']?.value.trim();
    
    if (passwordActual && passwordNuevo) {
      // Verificar contraseña actual
      if (passwordActual !== usuario.password) {
        alert('La contraseña actual es incorrecta');
        return false;
      }
      
      // Verificar que las contraseñas nuevas coincidan
      if (passwordNuevo !== passwordConfirm) {
        alert('Las contraseñas nuevas no coinciden');
        return false;
      }
      
      // Actualizar contraseña
      nuevosDatos.password = passwordNuevo;
    }
    
    // Actualizar usuario en localStorage (sessionUser)
    localStorage.setItem('sessionUser', JSON.stringify(nuevosDatos));
    
    // También actualizar en la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const index = usuarios.findIndex(u => u.email === usuario.email);
    if (index !== -1) {
      usuarios[index] = nuevosDatos;
      localStorage.setItem('users', JSON.stringify(usuarios));
    }
    
    alert('Perfil actualizado correctamente');
    
    // Recargar la página para mostrar los cambios
    window.location.reload();
    
    return false;
  },
  
  /**
   * Obtiene el historial de reservas del usuario
   * @returns {Array} Lista de reservas del usuario
   */
  obtenerHistorialReservas: function() {
    const usuario = JSON.parse(localStorage.getItem('sessionUser'));
    if (!usuario) {
      console.error('No hay usuario autenticado');
      return [];
    }
    
    // Importar funcionalidad del sistema de reservas
    if (typeof ReservasSystem === 'undefined') {
      console.error('El sistema de reservas no está disponible');
      return [];
    }
    
    return ReservasSystem.obtenerReservasUsuario(usuario.email);
  },
  
  /**
   * Muestra el historial de reservas en un contenedor
   * @param {string} containerId - ID del contenedor donde mostrar el historial
   */
  mostrarHistorialReservas: function(containerId = 'reservas-container') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`No se encontró el contenedor con ID: ${containerId}`);
      return;
    }
    
    const reservas = this.obtenerHistorialReservas();
    
    // Si no hay reservas, mostrar mensaje
    if (!reservas || reservas.length === 0) {
      container.innerHTML = '<p class="no-reservas">No tienes reservas activas</p>';
      return;
    }
    
    // Ordenar reservas (más recientes primero)
    reservas.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    
    // Crear HTML para cada reserva
    let html = '<div class="reservas-list">';
    
    reservas.forEach(reserva => {
      const cancha = ReservasSystem.obtenerCanchaPorId(reserva.idCancha);
      const fecha = new Date(reserva.fecha + 'T00:00:00');
      const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
      
      // Determinar clase CSS según estado de la reserva
      let estadoClase = 'estado-confirmada';
      if (reserva.estado === 'cancelada') estadoClase = 'estado-cancelada';
      if (reserva.estado === 'completada') estadoClase = 'estado-completada';
      
      html += `
        <div class="reserva-card">
          <div class="reserva-header">
            <h3>${cancha ? cancha.nombre : 'Cancha no disponible'}</h3>
            <span class="reserva-estado ${estadoClase}">${reserva.estado}</span>
          </div>
          <div class="reserva-info">
            <p><strong>Fecha:</strong> ${fechaFormateada}</p>
            <p><strong>Hora:</strong> ${reserva.hora}:00 - ${reserva.hora + reserva.duracion}:00</p>
            <p><strong>Precio:</strong> $${reserva.precio.toLocaleString('es-ES')}</p>
          </div>
          ${reserva.estado === 'confirmada' ? `
            <button class="cancelar-reserva-btn" data-id="${reserva.id}">Cancelar reserva</button>
          ` : ''}
        </div>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Añadir eventos a los botones de cancelación
    container.querySelectorAll('.cancelar-reserva-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const idReserva = parseInt(e.target.dataset.id);
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
          const resultado = ReservasSystem.cancelarReserva(idReserva);
          if (resultado) {
            alert('Reserva cancelada correctamente');
            this.mostrarHistorialReservas(containerId); // Actualizar listado
          } else {
            alert('No se pudo cancelar la reserva');
          }
        }
      });
    });
  }
};

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Si estamos en la página de perfil, cargar datos del usuario
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    PerfilSystem.cargarDatosUsuario('profile-form');
    profileForm.addEventListener('submit', PerfilSystem.actualizarPerfil);
  }
  
  // Si hay un contenedor de reservas, mostrar historial
  const reservasContainer = document.getElementById('reservas-container');
  if (reservasContainer) {
    PerfilSystem.mostrarHistorialReservas('reservas-container');
  }
  
  console.log("Sistema de perfiles inicializado");
});
