/**
 * Sistema de reservas usando localStorage
 * Este archivo proporciona funciones para gestionar reservas de canchas
 */

const ReservasSystem = {
  // Clave para almacenar las reservas en localStorage
  RESERVAS_KEY: 'nextsports_reservas',
  
  // Clave para almacenar las canchas en localStorage
  CANCHAS_KEY: 'nextsports_canchas',
  
  /**
   * Inicializa el sistema de reservas con datos de ejemplo si no existen
   */
  inicializar: function() {
    // Verificar si ya hay canchas definidas
    if (!localStorage.getItem(this.CANCHAS_KEY)) {
      const canchasEjemplo = [
        {
          id: 1,
          nombre: "Cancha Sintética El Campín",
          descripcion: "Cancha de fútbol 7 con césped sintético de última generación",
          ubicacion: "Calle 57 #21-83",
          precio: 120000, // Precio por hora en pesos
          deporte: "Fútbol",
          tamaño: "Fútbol 7",
          superficie: "Sintética",
          imagen: "/dev/img/Soccer7.jpg",
          horaApertura: 8, // 8 AM
          horaCierre: 22, // 10 PM
          disponible: true
        },
        {
          id: 2,
          nombre: "Cancha Don Balón",
          descripcion: "Cancha techada para jugar sin preocuparte por el clima",
          ubicacion: "Avenida Caracas #70-43",
          precio: 150000,
          deporte: "Fútbol",
          tamaño: "Fútbol 5",
          superficie: "Sintética",
          imagen: "/dev/img/Donbalon.png",
          horaApertura: 9, // 9 AM
          horaCierre: 23, // 11 PM
          disponible: true
        },
        {
          id: 3,
          nombre: "Polideportivo La Estancia",
          descripcion: "Complejo deportivo con múltiples canchas disponibles",
          ubicacion: "Carrera 89 #38-27 Sur",
          precio: 80000,
          deporte: "Baloncesto",
          tamaño: "Estándar",
          superficie: "Dura",
          imagen: "/dev/img/Canchas8.jpg",
          horaApertura: 7, // 7 AM
          horaCierre: 21, // 9 PM
          disponible: true
        },
        {
          id: 4,
          nombre: "Club El Rancho",
          descripcion: "Canchas privadas con vestuarios y servicios premium",
          ubicacion: "Calle 194 #45-20",
          precio: 200000,
          deporte: "Tenis",
          tamaño: "Individual/Dobles",
          superficie: "Arcilla",
          imagen: "/dev/img/Canchas5.jpg",
          horaApertura: 6, // 6 AM
          horaCierre: 20, // 8 PM
          disponible: true
        },
        {
          id: 5,
          nombre: "Centro Deportivo La Victoria",
          descripcion: "Canchas municipales con precios accesibles",
          ubicacion: "Carrera 5 Este #31-45 Sur",
          precio: 60000,
          deporte: "Fútbol",
          tamaño: "Fútbol 11",
          superficie: "Natural",
          imagen: "/dev/img/Canchas7.jpg",
          horaApertura: 8, // 8 AM
          horaCierre: 18, // 6 PM
          disponible: true
        }
      ];
      
      localStorage.setItem(this.CANCHAS_KEY, JSON.stringify(canchasEjemplo));
      console.log("Canchas de ejemplo inicializadas");
    }
    
    // Verificar si ya hay reservas definidas
    if (!localStorage.getItem(this.RESERVAS_KEY)) {
      localStorage.setItem(this.RESERVAS_KEY, JSON.stringify([]));
      console.log("Sistema de reservas inicializado");
    }
  },
  
  /**
   * Obtiene todas las canchas disponibles
   * @returns {Array} Lista de canchas
   */
  obtenerCanchas: function() {
    const canchas = JSON.parse(localStorage.getItem(this.CANCHAS_KEY)) || [];
    return canchas;
  },
  
  /**
   * Obtiene una cancha por su ID
   * @param {number} id - ID de la cancha
   * @returns {Object|null} Cancha encontrada o null
   */
  obtenerCanchaPorId: function(id) {
    const canchas = this.obtenerCanchas();
    return canchas.find(cancha => cancha.id === parseInt(id)) || null;
  },
  
  /**
   * Obtiene todas las reservas
   * @returns {Array} Lista de reservas
   */
  obtenerReservas: function() {
    const reservas = JSON.parse(localStorage.getItem(this.RESERVAS_KEY)) || [];
    return reservas;
  },
  
  /**
   * Obtiene las reservas de un usuario específico
   * @param {string} emailUsuario - Email del usuario
   * @returns {Array} Lista de reservas del usuario
   */
  obtenerReservasUsuario: function(emailUsuario) {
    const reservas = this.obtenerReservas();
    return reservas.filter(reserva => reserva.emailUsuario === emailUsuario);
  },
  
  /**
   * Verifica la disponibilidad de una cancha en una fecha y hora específicas
   * @param {number} idCancha - ID de la cancha
   * @param {string} fecha - Fecha en formato YYYY-MM-DD
   * @returns {Array} Horas disponibles (números del 0 al 23)
   */
  verificarDisponibilidad: function(idCancha, fecha) {
    const cancha = this.obtenerCanchaPorId(idCancha);
    if (!cancha || !cancha.disponible) {
      return [];
    }
    
    // Crear array con todas las horas posibles según horario de la cancha
    const horasDisponibles = [];
    for (let hora = cancha.horaApertura; hora < cancha.horaCierre; hora++) {
      horasDisponibles.push(hora);
    }
    
    // Obtener reservas para esta cancha en esta fecha
    const reservas = this.obtenerReservas().filter(r => 
      r.idCancha === idCancha && r.fecha === fecha && r.estado !== 'cancelada'
    );
    
    // Filtrar las horas que ya están reservadas
    return horasDisponibles.filter(hora => 
      !reservas.some(r => r.hora === hora)
    );
  },
  
  /**
   * Crea una nueva reserva
   * @param {Object} datosReserva - Datos de la reserva
   * @returns {Object|null} Reserva creada o null si hay error
   */
  crearReserva: function(datosReserva) {
    // Validar que la cancha exista
    const cancha = this.obtenerCanchaPorId(datosReserva.idCancha);
    if (!cancha) {
      console.error("La cancha no existe");
      return null;
    }
    
    // Validar disponibilidad
    const horasDisponibles = this.verificarDisponibilidad(
      datosReserva.idCancha, 
      datosReserva.fecha
    );
    
    if (!horasDisponibles.includes(datosReserva.hora)) {
      console.error("La hora seleccionada no está disponible");
      return null;
    }
    
    // Verificar si el usuario está autenticado
    const usuario = JSON.parse(localStorage.getItem('sessionUser'));
    if (!usuario) {
      console.error("Debe iniciar sesión para realizar una reserva");
      return null;
    }
    
    // Crear objeto de reserva
    const reservas = this.obtenerReservas();
    const nuevaReserva = {
      id: Date.now(), // Usar timestamp como ID único
      idCancha: datosReserva.idCancha,
      emailUsuario: usuario.email,
      nombreUsuario: usuario.name,
      fecha: datosReserva.fecha,
      hora: datosReserva.hora,
      duracion: datosReserva.duracion || 1, // Por defecto 1 hora
      precio: cancha.precio * (datosReserva.duracion || 1),
      estado: 'confirmada',
      fechaCreacion: new Date().toISOString()
    };
    
    // Guardar reserva
    reservas.push(nuevaReserva);
    localStorage.setItem(this.RESERVAS_KEY, JSON.stringify(reservas));
    
    return nuevaReserva;
  },
  
  /**
   * Cancela una reserva existente
   * @param {number} idReserva - ID de la reserva
   * @returns {boolean} true si se canceló correctamente
   */
  cancelarReserva: function(idReserva) {
    const reservas = this.obtenerReservas();
    const index = reservas.findIndex(r => r.id === idReserva);
    
    if (index === -1) {
      console.error("Reserva no encontrada");
      return false;
    }
    
    // Verificar si es el mismo usuario o un administrador
    const usuario = JSON.parse(localStorage.getItem('sessionUser'));
    if (!usuario) {
      console.error("Debe iniciar sesión");
      return false;
    }
    
    if (reservas[index].emailUsuario !== usuario.email && usuario.rol !== 'administrador') {
      console.error("No tiene permisos para cancelar esta reserva");
      return false;
    }
    
    // Actualizar estado
    reservas[index].estado = 'cancelada';
    localStorage.setItem(this.RESERVAS_KEY, JSON.stringify(reservas));
    
    return true;
  },
  
  /**
   * Filtra canchas por criterios
   * @param {Object} filtros - Criterios de filtrado (deporte, ubicacion, etc)
   * @returns {Array} Canchas filtradas
   */
  filtrarCanchas: function(filtros = {}) {
    let canchas = this.obtenerCanchas();
    
    // Filtrar por deporte
    if (filtros.deporte) {
      canchas = canchas.filter(c => c.deporte.toLowerCase() === filtros.deporte.toLowerCase());
    }
    
    // Filtrar por superficie
    if (filtros.superficie) {
      canchas = canchas.filter(c => c.superficie.toLowerCase() === filtros.superficie.toLowerCase());
    }
    
    // Filtrar por precio máximo
    if (filtros.precioMax && !isNaN(filtros.precioMax)) {
      canchas = canchas.filter(c => c.precio <= parseFloat(filtros.precioMax));
    }
    
    // Filtrar por disponibilidad en fecha y hora
    if (filtros.fecha && filtros.hora) {
      canchas = canchas.filter(cancha => {
        const horasDisponibles = this.verificarDisponibilidad(cancha.id, filtros.fecha);
        return horasDisponibles.includes(parseInt(filtros.hora));
      });
    }
    
    return canchas;
  }
};

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  ReservasSystem.inicializar();
  console.log("Sistema de reservas inicializado");
});
