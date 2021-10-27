const B_WIDTH = 500;
const B_HEIGHT = 500;
const M = 0.3;
const PUNTOS = 1000;

const xCenter = B_WIDTH / 2;
const yCenter = B_HEIGHT / 2;

let cnv;
let perceptron;
let puntos = [];

function setup() {
  cnv = createCanvas(B_WIDTH, B_HEIGHT);
  centerCanvas();

  frameRate(2);
  //Crear la neurona con el perceptrón con dos entradas y 0.2 de tasa de aprendizaje
  perceptron = new Perceptron(2, 0.2);
  //Crear los primerios PUNTOS de puntos fijos
  for (let i = 0; i < PUNTOS; i++) {
    puntos.push(
      new Punto(
        Math.random() * (2 * xCenter) - xCenter,
        Math.random() * (2 * yCenter) - yCenter
      )
    );
  }
}

function draw() {
  background("#F5F0D0");
  drawAxis();
  //Colocar el centro de las coordenadas en el centro del canvas
  translate(xCenter, yCenter);
  //Girar el eje de las Y
  scale(1, -1);
  //Dibujar la linea pendiente
  line(-xCenter, -xCenter * M, xCenter, xCenter * M);
  //Asignar el tipo a cada punto y colorearlo

  let check = 0;
  puntos.forEach((e) => {
    e.type = perceptron.clasificar([e.x, e.y]);
    e.draw();
    let realType = e.y > M * e.x ? 1 : 0;
    if (realType == e.type) {
      check++;
    }
  });
  //Crear un nuevo punto aleatorio con el que se entrenara al perceptrón
  let x = Math.random() * (2 * xCenter) - xCenter;
  let y = Math.random() * (2 * yCenter) - yCenter;
  perceptron.entrenamiento([x, y], y > M * x ? 1 : 0);

  console.log(check)
  if (check >= PUNTOS*0.95) noLoop();
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
