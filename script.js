/*Qué hace este archivo:
-Espera que el usuario haga clic en el botón.
-Calcula el ángulo total del giro (5 vueltas + 45°).
-Aplica una rotación con animación CSS.
-Luego muestra un mensaje.
 */

const ruleta = document.getElementById("ruleta");
const boton = document.getElementById("girarBtn");
let girando = false;

boton.addEventListener("click", () => {
  if (girando) return; // evita clics dobles
  girando = true;

  // Configuración de la animación
  const vueltas = 5; // cantidad de vueltas completas
  const anguloFinal = 45; // ángulo donde se detiene
  const rotacionTotal = 360 * vueltas + anguloFinal;

  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  // Mensaje al finalizar el giro
  setTimeout(() => {
    girando = false;
    alert("🎉FELICIDADES ¡Ganaste un bono especial! 🎉\nPara cobrarlo presione el boton de contacto");
  }, 4200);
});