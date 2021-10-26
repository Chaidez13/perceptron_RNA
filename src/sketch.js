const B_WIDTH = 500;
const B_HEIGHT = 500;
const M = 0.3;
const PUNTOS = 100;

let cnv;
let perceptron;
let puntos = [];

function setup() {
  cnv = createCanvas(B_WIDTH, B_HEIGHT);
  centerCanvas();

  frameRate(2);
  perceptron = new Perceptron(2, 0.2);
  for (let i = 0; i < PUNTOS; i++) {
    puntos.push(new Punto(Math.random() * B_WIDTH, Math.random() * B_HEIGHT));
  }
}

function draw() {
  background("#F5F0D0");
  drawAxis();
  line(B_WIDTH / 2 - B_WIDTH / M, 0, B_WIDTH / 2 + B_WIDTH / M, B_HEIGHT);

  puntos.forEach((e) => {
    e.type = perceptron.clasificar([e.x, e.y]);
    e.draw();
  });

  let x = Math.random() * B_WIDTH;
  let y = Math.random() * B_HEIGHT;
  perceptron.entrenamiento([x, y], y < M * x ? 1 : -1);

  //noLoop();
}

//Funciones auxiliares
function drawAxis() {
  push();
  stroke(200);
  line(B_WIDTH / 2, 0, B_WIDTH / 2, B_HEIGHT);
  line(0, B_HEIGHT / 2, B_WIDTH, B_HEIGHT / 2);
  pop();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
