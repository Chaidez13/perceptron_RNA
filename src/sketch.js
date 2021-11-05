const B_WIDTH = 150;
const B_HEIGHT = 150;
const M = 0.3;
const PUNTOS = 250;
const P_TRAINING = 50;

const RANGE = 45;
const TOL = 0.85;

const clase1 = { x: -B_WIDTH / 2, y: B_HEIGHT / 2 };
const clase2 = { x: B_WIDTH / 2, y: -B_HEIGHT / 2 };

let cnv;
let rna;
let puntos = [];
let p_aux = [];

let counter = 0;
let n_c1 = 0;
let n_c2 = 0;

function setup() {
  cnv = createCanvas(B_WIDTH * 2, B_HEIGHT * 2);
  centerCanvas();

  frameRate(5);
  rna = new RNA(2, 4, 2, 0.5);

  /* 
  for (let i = 0; i < PUNTOS; i += 2) {
    puntos[i] = new Punto(
      getRandomNumber(clase1.x + RANGE, clase1.x-RANGE),
      getRandomNumber(clase1.y + RANGE, clase1.y-RANGE),
    );
    puntos[i+1] = new Punto(
      getRandomNumber(clase2.x + RANGE, clase2.x-RANGE),
      getRandomNumber(clase2.y + RANGE, clase2.y-RANGE),
    );
  }
  puntos.forEach((e) => {
    if (dist(e.x, e.y, clase1.x, clase1.y) < RANGE) n_c1++;
    if (dist(e.x, e.y, clase2.x, clase2.y) < RANGE) n_c2++;
  });
  */
}

function draw() {
  background("#F5F0D0");
  drawAxis();
  drawRanges();
  //Colocar el centro de las coordenadas en el centro del canvas y girar el eje Y
  translate(B_WIDTH, B_HEIGHT);
  scale(1, -1);

  let n1 = 0,
    n2 = 0,
    er = 0;
  //Ciclo real

  /*
  puntos.forEach((e) => {
    e.type = categorizar(rna.classify(e.getCoords()));
    e.draw();
  });
  */

  //Ciclo de entrenamiento
  for (let i = 0; i < P_TRAINING; i += 2) {
    p_aux[i] = new Punto(
      getRandomNumber(clase1.x + RANGE, clase1.x - RANGE),
      getRandomNumber(clase1.y + RANGE, clase1.y - RANGE)
    );
    p_aux[i + 1] = new Punto(
      getRandomNumber(clase2.x + RANGE, clase2.x - RANGE),
      getRandomNumber(clase2.y + RANGE, clase2.y - RANGE)
    );
  }

  p_aux.forEach((p) => {
    let tipo = Array(2).fill(0);
    if (dist(p.x, p.y, clase1.x, clase1.y) < RANGE) tipo[0] = 1;
    if (dist(p.x, p.y, clase2.x, clase2.y) < RANGE) tipo[1] = 1;

    rna.training(p.getCoords(), tipo);
    p.type = categorizar(rna.classify(p.getCoords()));
    p.draw();
  });
  counter++;
  if (n1 > n_c1 * TOL && n2 > n_c2 * TOL && er < 5) {
    console.log(
      `RN entrenada con ${(n_c1 / n1) * 100}% de eficacia en ${counter} epocas.`
    );
    noLoop();
  }
}
//Funciones auxiliares de dibujo del canvas
function drawAxis() {
  push();
  stroke(200);
  line(B_WIDTH, 0, B_WIDTH, B_HEIGHT * 2);
  line(0, B_HEIGHT, B_WIDTH * 2, B_HEIGHT);
  pop();
}

function drawRanges() {
  push();
  translate(B_WIDTH, B_HEIGHT);
  scale(1, -1);
  fill(0, 0, 0, 0);
  stroke(255, 0, 0);
  ellipse(clase1.x, clase1.y, RANGE * 2);
  stroke(0, 255, 0);
  ellipse(clase2.x, clase2.y, RANGE * 2);
  pop();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
