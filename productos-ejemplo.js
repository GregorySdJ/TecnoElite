
(function cargarProductosEjemplo() {
  const productosGuardados = localStorage.getItem('productos');
  if (productosGuardados) return; // Ya hay productos, no sobrescribir

  const productosEjemplo = [
    {
      nombre: "Samsung Galaxy S23",
      precio: 15999.99,
      categoria: "Celular",
      imagen: "https://example.com/img/samsung-s23.jpg",
      agotado: false,
      oferta: true,
      destacado: true
    },
    {
      nombre: "Apple Watch Series 9",
      precio: 10999.00,
      categoria: "Reloj",
      imagen: "https://example.com/img/apple-watch9.jpg",
      agotado: false,
      oferta: false,
      destacado: true
    },
    {
      nombre: "Sony WH-1000XM5",
      precio: 6999.00,
      categoria: "Auricular",
      imagen: "https://example.com/img/sony-wh1000xm5.jpg",
      agotado: false,
      oferta: false,
      destacado: false
    },
    {
      nombre: "DJI Mini 3 Pro",
      precio: 12999.00,
      categoria: "Dron",
      imagen: "https://example.com/img/dji-mini3pro.jpg",
      agotado: true,
      oferta: false,
      destacado: false
    }
  ];

  localStorage.setItem('productos', JSON.stringify(productosEjemplo));
})();
