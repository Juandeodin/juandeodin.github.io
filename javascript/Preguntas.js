let preguntas = [];
let actual = 0;

document.getElementById("empezar").onclick = async function () {
  // Obtener categorías seleccionadas
  const categorias = Array.from(
    document.querySelectorAll('input[name="categoria"]:checked')
  ).map((cb) => cb.value);
  // Leer el CSV
  const res = await fetch("questions/yoNunca.csv");
  const texto = await res.text();
  preguntas = texto
    .split("\n")
    .slice(1) // Saltar cabecera
    .map((linea) => {
      const partes = linea.split(",");
      return { tipo: partes[0], pregunta: partes[1] };
    })
    .filter((q) => categorias.includes(q.tipo));
  actual = 0;
  mostrarPregunta();
  document.getElementById("pregunta").classList.remove("d-none");
  document.getElementById("siguiente").classList.remove("d-none");
  document.getElementById("empezar").classList.add("d-none");
  // Ocultar los checkboxes y sus labels
  document
    .querySelectorAll('input[name="categoria"], label[for], .form-label')
    .forEach((el) => el.classList.add("d-none"));
};

document.getElementById("siguiente").onclick = function () {
  actual++;
  mostrarPregunta();
};

function mostrarPregunta() {
  if (actual >= preguntas.length) {
    actual = 0; // Reiniciar al final
  }
  document.getElementById("pregunta").textContent = preguntas[actual].pregunta;
}
