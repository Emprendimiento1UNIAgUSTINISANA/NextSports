const container_log = document.querySelector('.container_log');
const container_register = document.querySelector('.container_register');

function activate_Sign_up() {
    container_log.style.transition = 'opacity 0.5s ease';
    container_register.style.transition = 'opacity 0.5s ease';

    container_log.style.opacity = '0'; // Fade out del login
    setTimeout(() => {
        container_log.style.visibility = 'hidden'; // Oculta después del fade out
        container_register.style.visibility = 'visible'; // Muestra el registro
        container_register.style.opacity = '1'; // Fade in del registro
    }, 500); // Tiempo igual a la duración de la transición
}

function activate_sign_in() {
    container_register.style.transition = 'opacity 0.5s ease';
    container_log.style.transition = 'opacity 0.5s ease';

    container_register.style.opacity = '0'; // Fade out del registro
    setTimeout(() => {
        container_register.style.visibility = 'hidden'; // Oculta después del fade out
        container_log.style.visibility = 'visible'; // Muestra el login
        container_log.style.opacity = '1'; // Fade in del login
    }, 500); // Tiempo igual a la duración de la transición
}