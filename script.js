const ruleta = document.getElementById("ruleta");
const boton = document.getElementById("girarBtn");
let girando = false;


// ==== DATA DE LA RULETA ====
// Cada sector con valor + color
const sectors = [
  { value: 20, color: "red" },
  { value: 10, color: "black" },
  { value: 20, color: "red" },
  { value: 30, color: "green" },   // ganador
  { value: 20, color: "red" },
  { value: 10, color: "black" },
  { value: 20, color: "red" },
  { value: 30, color: "green" },   // ganador
  { value: 20, color: "red" },
  { value: 10, color: "black" },
  { value: 20, color: "red" },
  { value: 30, color: "green" }    // ganador
];


// ==== RENDER NUMEROS ====
function renderValues() {
  ruleta.innerHTML = "";

  // Ajustes manuales
  const angleOffset = 15;   // ← rota toda la rueda (ajustar a gusto)
  const radiusAdjust = -5;   // ← acerca/aleja numeración

  const total = sectors.length;
  const angleStep = 360 / total;

  // Radio real
  const rect = ruleta.getBoundingClientRect();
  const radius = rect.width / 2 - 28 + radiusAdjust;   // ← acá se usa!

  sectors.forEach((sector, i) => {
    const label = document.createElement("div");
    label.classList.add("sector-label");
    label.innerText = sector.value;
    label.style.color = sector.color;

    const angle = angleStep * i + angleOffset;   // ← acá se usa!

    label.style.transform = `
      rotate(${angle}deg)
      translateY(-${radius}px)
      rotate(-${angle}deg)
    `;

    ruleta.appendChild(label);
  });
}

// render inicial
renderValues();
// recalcular al redimensionar ventana (importante)
window.addEventListener('resize', () => {
  // pequeño debounce para no disparar mil veces
  clearTimeout(window.__rv_timeout);
  window.__rv_timeout = setTimeout(renderValues, 120);
});

// ==== GIRO ====
boton.addEventListener("click", () => {
  if (girando) return;
  girando = true;

  const vueltas = 5;

  // BUSCAMOS un sector verde
  const greenIndexes = sectors
    .map((s, index) => (s.value === 30 ? index : null))
    .filter(index => index !== null);

  // Elegimos UN verde al azar
  const chosen = greenIndexes[Math.floor(Math.random() * greenIndexes.length)];

  const angleSector = 360 / sectors.length;
  const anguloFinal =angleSector+ angleSector * chosen + angleSector / 2;

  const rotacionTotal = 360 * vueltas + anguloFinal;

  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  setTimeout(() => {
    girando = false;
    alert("🎉 ¡FELICIDADES, GANASTE 30! 🎉\nPresiona el botón de contacto para reclamar tu premio");
  }, 4200);
});