// Coordenadas del centro de Bogotá
const bogotaCoords = [4.7110, -74.0721];
// Crear el mapa
const map = L.map('map').setView(bogotaCoords, 13); // 13 es el nivel de zoom
// Añadir el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);
// Añadir un marcador en el centro
L.marker(bogotaCoords).addTo(map)
    .bindPopup('Bogotá, Colombia')
    .openPopup();