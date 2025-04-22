function showPaymentForm(method) {
    // Obtener el contenedor dinámico para el formulario
    const payment = document.getElementById('payment_method');
    // Limpiar el contenedor antes de agregar un nuevo formulario
    payment.innerHTML = '';
    // Generar el contenido del formulario según el método seleccionado
    switch (method) {
        case 'tarjeta':
            payment.innerHTML = `
                <form method="post" id="payment_card_form">
                    <h2>Detalles de tarjeta</h2>
                    <div class="card_number">
                        <input type="text" id="card_number" name="card_number" required placeholder="Número de tarjeta">
                    </div>
                    <div class="card_data">
                        <input type="text" id="card_expiration_date" name="card_expiration_date" required placeholder="MM/AA">
                        <input type="text" id="card_cvc" name="card_cvv" required placeholder="CVV">
                    </div>
                    <div class="holder_name">
                        <input type="text" id="holder_name" name="holder_name" required placeholder="Nombre del titular">
                    </div>
                    <div class="save_card">
                        <label for="save_card">
                            <input type="checkbox" id="save_card" name="save_card">
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            `;
            break;
        case 'paypal':
            payment.innerHTML = `
                <form method="post" id="payment_form">
                    <h2>Pago con PayPal</h2>
                    <p>Será redirigido a PayPal para completar el pago.</p>
                    <button>Pagar con PayPal</button>
                </form>
            `;
            break;
        case 'transferencia':
            payment.innerHTML = `
                <form method="post" id="payment_form">
                    <h2>Pago por PSE</h2>
                    <p>Será redirigido a PSE para completar el pago.</p>
                    <button>Pagar con PSE</button>
                </form>
            `;
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

document.addEventListener('DOMContentLoaded', activatePaymentMethods);