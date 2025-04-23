// js/detalle.js

// 1. Catálogo de datos
const canchas = {
    donbalon: {
      nombre: "Don Balón",
      imgHeader: "/dev/img/Donbalon.png",
      location: "Soacha, Cundinamarca",
      price: "$50000",
      description: "Tenemos para ti el mejor espacio deportivo, de entrenamiento y recreación del sector.",
      features: [
        { icon: "fas fa-home", label: "3 Canchas" },
        { icon: "fas fa-wifi", label: "Wifi" },
        { icon: "fas fa-car", label: "Parqueadero" }
      ],
      gallery: [
        "gallery-1.jpg",
        "gallery-2.jpg",
        "gallery-3.jpg",
        "gallery-4.jpg"
      ],
      phone: "+57 300 123 4567"
    },
    soccer7: {
      nombre: "Super Soccer 7",
      imgHeader: "/dev/img/Soccer7.jpg",
      location: "Bogotá, Colombia",
      price: "$40000",
      description: "Disfruta de la mejor cancha sintética con iluminación y servicios.",
      features: [
        { icon: "fas fa-home", label: "6 Canchas" },
        { icon: "fas fa-wifi", label: "Wifi" }
      ],
      gallery: [
        "soccer7-1.jpg",
        "soccer7-2.jpg"
      ],
      phone: "+57 310 987 6543"
    },
    canchasinteticas: {
        nombre: "Canchas Sinteticas",
        imgHeader: "/dev/img/CanchasSinteticas.jpg",
        location: "Bogota, Colombia",
        price: "$45000",
        description: "Tenemos para ti el mejor espacio deportivo, de entrenamiento y recreación del sector.",
        features: [
          { icon: "fas fa-home", label: "2 Canchas" },
          { icon: "fas fa-wifi", label: "Wifi" },
          { icon: "fas fa-car", label: "Parqueadero" }
        ],
        gallery: [
          "gallery-1.jpg",
          "gallery-2.jpg",
          "gallery-3.jpg",
          "gallery-4.jpg"
        ],
        phone: "+57 300 123 4567"
      },
      futbol8: {
        nombre: "Futbol 8",
        imgHeader: "/dev/img/Canchas8.jpg",
        location: "Bogota, Colombia",
        price: "$60000",
        description: "Disfruta de una cancha sintética iluminada, con césped de alta calidad, vestuarios modernos y zona de parqueo, ideal para partidos rápidos y dinámicos con amigos.",
        features: [
          { icon: "fas fa-home", label: "2 Canchas" },
          { icon: "fas fa-wifi", label: "Wifi" },
          { icon: "fas fa-car", label: "Parqueadero" }
        ],
        gallery: [
          "gallery-1.jpg",
          "gallery-2.jpg",
          "gallery-3.jpg",
          "gallery-4.jpg"
        ],
        phone: "+57 300 123 4567"
      },
      futbol11fa: {
        nombre: "Futbol 11 y FA",
        imgHeader: "/dev/img/Canchas11.avif",
        location: "Bogota, Colombia",
        price: "$55500",
        description: "Disfruta de una cancha sintética iluminada, con césped de alta calidad, vestuarios modernos y zona de parqueo, ideal para partidos rápidos y dinámicos con amigos.",
        features: [
          { icon: "fas fa-home", label: "2 Canchas" },
          { icon: "fas fa-wifi", label: "Wifi" },
          { icon: "fas fa-car", label: "Parqueadero" }
        ],
        gallery: [
          "gallery-1.jpg",
          "gallery-2.jpg",
          "gallery-3.jpg",
          "gallery-4.jpg"
        ],
        phone: "+57 300 123 4567"
      },
  };
  
  function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const id = getQueryParam('id');
    const data = canchas[id];
  
    if (!data) {
      document.body.innerHTML = "<p>❌ Cancha no encontrada.</p>";
      return;
    }
  
    document.getElementById('facility-name').textContent = data.nombre;
    document.getElementById('facility-location').textContent = data.location;
    document.getElementById('facility-price').textContent = data.price;
    document.getElementById('facility-description').textContent = data.description;
    document.getElementById('header-image').src = data.imgHeader;
    document.getElementById('header-image').alt = data.nombre + " facility";
  
    const featuresContainer = document.getElementById('feature-buttons');
    data.features.forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.innerHTML = `<i class="${f.icon}"></i> <span>${f.label}</span>`;
      featuresContainer.appendChild(btn);
    });
  
    const gal = document.getElementById('gallery-grid');
    data.gallery.forEach(src => {
      const img = document.createElement('img');
      img.className = 'gallery-img';
      img.src = src;
      img.alt = data.nombre;
      gal.appendChild(img);
    });
  
    document.getElementById('reserve-btn').addEventListener('click', () => {
      document.getElementById('reserva-modal').classList.remove('hidden');
    });
    
    document.getElementById('cerrar-modal').addEventListener('click', () => {
      document.getElementById('reserva-modal').classList.add('hidden');
    });
    
    document.getElementById('confirmar-reserva').addEventListener('click', () => {
      const fecha = document.getElementById('fecha-reserva').value;
      const hora = document.getElementById('hora-reserva').value;
      const duracion = document.getElementById('duracion-reserva').value;
    
      if (fecha && hora && duracion) {
        const id = getQueryParam('id');
        window.location.href = `pago.html?id=${id}&fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&duracion=${encodeURIComponent(duracion)}`;
      } else {
        alert("Por favor complete todos los campos.");
      }
    });
    
    });
