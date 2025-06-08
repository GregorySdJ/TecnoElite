let carrito = [];
let contador = 0;

// ========== MODO OSCURO ==========
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-dark");

  // Cargar preferencia del modo
  if (localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }
document.querySelector(".fa-shopping-cart")?.addEventListener("click", () => {
  document.getElementById("modal-carrito").style.display = "block";
  mostrarCarritoModal();
});

// Cerrar modal al hacer clic en la X o fuera
document.querySelector(".cerrar")?.addEventListener("click", () => {
  document.getElementById("modal-carrito").style.display = "none";
});

window.addEventListener("click", e => {
  const modal = document.getElementById("modal-carrito");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Mostrar productos en el modal
function mostrarCarritoModal() {
  const contenedor = document.getElementById("contenido-carrito");
  const totalTexto = document.getElementById("total-carrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalTexto.textContent = "";
    return;
  }

  let total = 0;
  carrito.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    contenedor.appendChild(div);
    total += item.precio * item.cantidad;
  });

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;
}
  // Evento de botón
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const darkModeActivo = document.body.classList.contains("dark-mode");
      toggleBtn.textContent = darkModeActivo ? "☀️" : "🌙";
      localStorage.setItem("modo", darkModeActivo ? "oscuro" : "claro");
    });
  }

  // Cargar carrito desde localStorage
  cargarCarrito();
});

// ========== AGREGAR AL CARRITO ==========
function mostrarCarritoModal() {
  const contenedor = document.getElementById("contenido-carrito");
  const totalTexto = document.getElementById("total-carrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalTexto.textContent = "";
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");

    div.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Cantidad: ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}<br>
      <button class="btn-restar" onclick="reducirCantidad(${index})">➖</button>
      <button class="btn-eliminar" onclick="eliminarProducto(${index})">🗑️</button>
      <hr>
    `;

    contenedor.appendChild(div);
    total += item.precio * item.cantidad;
  });

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;
}

// ========== FINALIZAR COMPRA ==========
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("Gracias por su elección. En breve nos pondremos en contacto con nuestros proveedores.");

  let mensaje = "Hola, quiero realizar una compra en TecnoElite. Estos son los productos que elegí:%0A";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
  });

  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  mensaje += `%0A🔢 Total: $${total.toFixed(2)}`;

  const numeroWhatsApp = "8297743499";
  window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  carrito = [];
  contador = 0;
  document.getElementById("contador").textContent = contador;
  guardarCarrito();
  actualizarCarrito();
}

// ========== ACTUALIZAR CARRITO ==========
function actualizarCarrito() {
  // Aquí puedes implementar si tienes modal o resumen en la página
  console.log("Carrito actualizado:", carrito);
}

// ========== GUARDAR Y CARGAR CARRITO ==========
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("contador", contador);
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  const contadorGuardado = localStorage.getItem("contador");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  if (contadorGuardado) {
    contador = parseInt(contadorGuardado);
    const contadorElem = document.getElementById("contador");
    if (contadorElem) contadorElem.textContent = contador;
  }
function reducirCantidad(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad -= 1;
  } else {
    carrito.splice(index, 1); // Eliminar si llega a 0
  }

  contador = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("contador").textContent = contador;
  guardarCarrito();
  mostrarCarritoModal();
}

// Eliminar producto completamente
function eliminarProducto(index) {
  contador -= carrito[index].cantidad;
  carrito.splice(index, 1);

  document.getElementById("contador").textContent = contador;
  guardarCarrito();
  mostrarCarritoModal();
}
  actualizarCarrito();
}
