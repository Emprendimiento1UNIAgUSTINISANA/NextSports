// canchas.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('figure[data-url]').forEach(fig => {
      // Mostrar cursor de mano
      fig.style.cursor = 'pointer';
  
      // Al hacer clic, redirige a la URL indicada
      fig.addEventListener('click', () => {
        const target = fig.getAttribute('data-url');
        if (target) {
          window.location.href = target;
        }
      });
    });
  });