document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formReparacion');
  const listaSolicitudes = document.getElementById('listaSolicitudes');

  let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

  function renderSolicitudes() {
    listaSolicitudes.innerHTML = '';

    if (solicitudes.length === 0) {
      listaSolicitudes.innerHTML = '<p>No hay solicitudes aún.</p>';
      return;
    }

    solicitudes.forEach((solicitud, index) => {
      const div = document.createElement('div');
      div.classList.add('solicitud');
      div.innerHTML = `
        <strong>Solicitud #${index + 1}</strong><br>
        <span><strong>Nombre:</strong> ${solicitud.nombre}</span><br>
        <span><strong>Equipo:</strong> ${solicitud.equipo}</span><br>
        <span><strong>Problema:</strong> ${solicitud.problema}</span><br>
        <span><strong>Contacto:</strong> ${solicitud.contacto}</span><br>
        <span><strong>Estado:</strong> <em>${solicitud.estado || 'Pendiente'}</em></span><br>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      `;
      listaSolicitudes.appendChild(div);
    });

    // Agregar eventos a los botones "Eliminar"
    document.querySelectorAll('.eliminar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        eliminarSolicitud(index);
      });
    });
  }

  function guardarSolicitudes() {
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }

  function eliminarSolicitud(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      solicitudes.splice(index, 1);
      guardarSolicitudes();
      renderSolicitudes();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaSolicitud = {
      nombre: form.nombre.value.trim(),
      equipo: form.equipo.value.trim(),
      problema: form.problema.value.trim(),
      contacto: form.contacto.value.trim(),
      estado: 'Pendiente'
    };

    const camposVacios = Object.values(nuevaSolicitud).some(val => val === '');

    if (camposVacios) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    solicitudes.push(nuevaSolicitud);
    guardarSolicitudes();
    renderSolicitudes();

    // Guardar solicitud actual para enviar por WhatsApp en gracias.html
    localStorage.setItem('ultimaSolicitud', JSON.stringify(nuevaSolicitud));

    // Redirigir a página de agradecimiento (ahí se abrirá WhatsApp)
    window.location.href = 'gracias.html';
  });

  // Mostrar solicitudes al cargar
  renderSolicitudes();
});