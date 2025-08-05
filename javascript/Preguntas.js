
let preguntas = [];
let actual = 0;


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function cargarPreguntas(juego) {
  actual = 0;
  const categorias = Array.from(
    document.querySelectorAll('input[name="categoria"]:checked')
  ).map((cb) => cb.value);
  const res = await fetch("questions/" + juego + ".csv");
  const texto = await res.text();
  preguntas = texto
    .split("\n")
    .slice(1)
    .map((linea) => {
      const partes = linea.split(",");
      return { tipo: partes[0], pregunta: partes[1] };
    })
    .filter((q) => categorias.includes(q.tipo));
  preguntas = shuffleArray(preguntas);
  actual = 0;
  mostrarPregunta();
  document.getElementById("pregunta").classList.remove("d-none");
  document.getElementById("siguiente").classList.remove("d-none");
  document.getElementById("empezar").classList.add("d-none");
  document.getElementById("formCategorias").classList.add("d-none");
}

function cambiarPantalla(){

    document.getElementById('pantalla-reglas').classList.add('d-none');
    document.getElementById('btnContinuar').classList.add('d-none');
    document.getElementById('pantalla-categorias').classList.remove('d-none');
    document.getElementById('empezar').classList.remove('d-none');

}



function siguientePregunta() {
  mostrarPregunta();
}


function mostrarPregunta() {
    if(actual >= preguntas.length) {
        preguntas = shuffleArray(preguntas);
        actual = 0;
    }
  document.getElementById("pregunta").textContent = preguntas[actual].pregunta;
  actual++;
}
