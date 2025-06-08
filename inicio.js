// Inicializar particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Máquina de escribir
const mensaje = "Tecnología al alcance de tus manos.";
let i = 0;
function escribir() {
  if (i < mensaje.length) {
    document.getElementById("typing").innerHTML += mensaje.charAt(i);
    i++;
    setTimeout(escribir, 60);
  }
}
window.addEventListener('DOMContentLoaded', escribir);

// Frases rotativas
const frases = [
  "Explora lo último en tecnología",
  "Ofertas exclusivas solo para ti",
  "Innovación que te conecta",
  "¡Comienza tu experiencia ahora!"
];
let index = 0;
setInterval(() => {
  document.getElementById("frase-dinamica").textContent = frases[index];
  index = (index + 1) % frases.length;
}, 3000);q

