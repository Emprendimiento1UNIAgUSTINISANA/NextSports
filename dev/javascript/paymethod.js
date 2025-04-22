function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    activatePaymentMethods();
  
    const id = getQueryParam('id');
    const fecha = getQueryParam('fecha');
    const hora = getQueryParam('hora');
    const duracion = getQueryParam('duracion');
  
    const data = canchas[id];
    if (!data) return;
  
    document.getElementById('court_type').textContent = data.nombre;
    document.getElementById('court_date').textContent = fecha;
    document.getElementById('court_time').textContent = hora;
    document.getElementById('court_duration').textContent = `${duracion} horas`;
    document.getElementById('court_price').textContent = data.price;
  });
  
  function showPaymentForm(method) {
    const payment = document.getElementById('payment_method');
    payment.innerHTML = '';
  
    switch (method) {
      case 'tarjeta':
        payment.innerHTML = `
          <form method="post" id="payment_card_form">
            <h2>Detalles de tarjeta</h2>
            <div class="card_number">
              <input type="text" required placeholder="Número de tarjeta">
            </div>
            <div class="card_data">
              <input type="text" required placeholder="MM/AA">
              <input type="text" required placeholder="CVV">
            </div>
            <div class="holder_name">
              <input type="text" required placeholder="Nombre del titular">
            </div>
            <div class="save_card">
              <label>
                <input type="checkbox"> Acepto los términos y condiciones
              </label>
            </div>
            <button type="submit" onclick="mostrarToast(event)">Enviar</button>
          </form>`;
        break;
      case 'paypal':
        payment.innerHTML = `
          <form method="post" id="payment_form">
            <h2>Pago con PayPal</h2>
            <p>Será redirigido a PayPal para completar el pago.</p>
            <button onclick="mostrarToast(event)">Pagar con PayPal</button>
          </form>`;
        break;
      case 'transferencia':
        payment.innerHTML = `
          <form method="post" id="payment_form">
            <h2>Pago por PSE</h2>
            <p>Será redirigido a PSE para completar el pago.</p>
            <button onclick="mostrarToast(event)">Pagar con PSE</button>
          </form>`;
        break;
      default:
        payment.innerHTML = `<p>Seleccione un método de pago.</p>`;
    }
  }
  
  function activatePaymentMethods() {
    const paymentMethodsForm = document.getElementById('payment_methods_form');
    paymentMethodsForm.addEventListener('change', (event) => {
      const selectedMethod = event.target.id;
      showPaymentForm(selectedMethod);
    });
  }
  
  function mostrarToast(event) {
    event.preventDefault(); // evitar recarga
    const toast = document.getElementById('reserva-exitosa');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      // Si quieres redirigir:
      // window.location.href = "gracias.html";
    }, 3000);
  }
  