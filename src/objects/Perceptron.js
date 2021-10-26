const MAX = 1;
const MIN = -1;

class Perceptron {
  constructor(n_inputs, alfa) {
    this.weights = [];
    for (let i = 0; i < n_inputs; i++) {
      this.weights[i] = Math.random() * (MAX - MIN) + MIN;
    }
    this.bias = Math.random() * (MAX - MIN) + MIN;
    this.alfa = alfa;
  }
  //Función para entrenar el perceptron
  entrenamiento(inputs, value) {
    const a = this.clasificar(inputs);
    const e = value - a;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += inputs[i] * e * this.alfa;
    }
    this.bias += e * a;
  }
  //Clasificar con las entradas y los pesos
  clasificar(inputs) {
    const reducer = (cV, pV, i) => pV * this.weights[i] + cV;
    return this.fSigmoid(inputs.reduce(reducer, 0) + this.bias);
  }
  //Función sigmoide
  fSigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
}
