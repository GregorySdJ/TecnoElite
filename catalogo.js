// Catálogo inicial si no existe en localStorage
const productosIniciales = [
  {
    id: 1,
    nombre: "Celular Tecno X1",
    precio: 300,
    disponible: true,
    categoria: "celular",
    imagen: "https://via.placeholder.com/160x160?text=Celular+X1"
  },
  {
    id: 2,
    nombre: "Auriculares ProSound",
    precio: 80,
    disponible: false,
    categoria: "auricular",
    imagen: "https://via.placeholder.com/160x160?text=Auriculares"
  },
  {
    id: 3,
    nombre: "Reloj Inteligente Z200",
    precio: 150,
    disponible: true,
    categoria: "reloj",
    imagen: "https://via.placeholder.com/160x160?text=Reloj+Z200"
  }
];

// Guardar catálogo inicial si no existe en localStorage
function cargarCatalogo() {
  if (!localStorage.getItem('catalogo')) {
    localStorage.setItem('catalogo', JSON.stringify(productosIniciales));
  }
}

// Obtener catálogo desde localStorage
function obtenerCatalogo() {
  return JSON.parse(localStorage.getItem('catalogo')) || [];
}

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const botonCarrito = document.querySelector('button[title="Ver carrito"]');
  if (!botonCarrito) return;
  const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  botonCarrito.textContent = totalCantidad > 0 ? `🛒 (${totalCantidad})` : '🛒';
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.tabIndex = 0;
    div.setAttribute('data-categoria', producto.categoria);

    div.innerHTML = `
      <a href="Espesificaciones.html" onclick="verDetalleProducto(${producto.id})" style="text-decoration: none; color: inherit;">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
      </a>
      <p class="precio">$${producto.precio.toFixed(2)}</p>
      <p class="${producto.disponible ? 'disponible' : 'agotado'}">
        ${producto.disponible ? 'Disponible' : 'Agotado'}
      </p>
      <button ${producto.disponible ? '' : 'disabled'} onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito
      </button>
    `;

    contenedor.appendChild(div);
  });
}

function verDetalleProducto(id) {
  const productos = obtenerCatalogo();
  const producto = productos.find(p => p.id === id);
  if (producto) {
    localStorage.setItem('productoDetalle', JSON.stringify(producto));
  }
}

function agregarAlCarrito(id) {
  const productos = obtenerCatalogo();
  const producto = productos.find(p => p.id === id);
  if (!producto || !producto.disponible) {
    alert('Producto no disponible');
    return;
  }

  const productoExistente = carrito.find(item => item.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }
  guardarCarrito();
  actualizarVistaCarrito();
  actualizarContadorCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  actualizarVistaCarrito();
  actualizarContadorCarrito();
}

function actualizarVistaCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const totalElement = document.getElementById('total-carrito');
  contenedor.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
  });

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    const porcentaje = total > 0 ? ((subtotal / total) * 100).toFixed(1) : 0;

    const itemDiv = document.createElement('div');
    itemDiv.style = `
      background-color: #2c2c2e;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 0.95rem;
      position: relative;
    `;

    itemDiv.innerHTML = `
      <strong>${index + 1}. ${item.nombre}</strong><br>
      Cantidad: ${item.cantidad}<br>
      Subtotal: $${subtotal.toFixed(2)}<br>
      Representa: ${porcentaje}% del total
      <button 
        onclick="eliminarDelCarrito(${item.id})" 
        style="
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e53935;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          line-height: 30px;
          text-align: center;
          padding: 0;
          transition: background-color 0.3s;
        "
        onmouseover="this.style.background='#b71c1c'" 
        onmouseout="this.style.background='#e53935'"
        aria-label="Eliminar ${item.nombre} del carrito"
      >
        ×
      </button>
    `;

    contenedor.appendChild(itemDiv);
  });

  totalElement.textContent = total.toFixed(2);
}

function toggleCarrito() {
  const contenedor = document.getElementById('carrito-contenedor');
  contenedor.style.display = (contenedor.style.display === 'none' || contenedor.style.display === '') ? 'block' : 'none';
}

// Función para filtrar productos según búsqueda y categoría
function filtrarYMostrar() {
  const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase();
  const categoriaSeleccionada = document.getElementById('categoriaSelect').value;
  const catalogo = obtenerCatalogo();

  const filtrados = catalogo.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  mostrarProductos(filtrados);
}

// Cuando la página carga:
document.addEventListener('DOMContentLoaded', () => {
  cargarCatalogo();
  mostrarProductos(obtenerCatalogo());
  actualizarVistaCarrito();
  actualizarContadorCarrito();

  // Eventos filtro y búsqueda
  document.getElementById('inputBusqueda').addEventListener('input', filtrarYMostrar);
  document.getElementById('categoriaSelect').addEventListener('change', filtrarYMostrar);

  // Evento botón finalizar compra
  const botonFinalizar = document.getElementById('finalizarCompra');
  if (botonFinalizar) {
    botonFinalizar.addEventListener('click', () => {
      if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
      }
      window.location.href = 'gracias.html';
    });
  }
});
