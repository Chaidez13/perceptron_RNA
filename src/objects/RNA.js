class RNA {
  /** Inicialización de las variables necesarias
   * @constructor
   * @param {int} n_entrada
   * @param {int} n_oculta
   * @param {int} n_salida
   * @param {float} alfa
   */
  constructor(n_entrada, n_oculta, n_salida, alfa) {
    this.capas = [n_entrada, n_oculta, n_salida];
    this.alfa = alfa;
    this.pesos_o = Array(n_entrada)
      .fill()
      .map(() =>
        Array(n_oculta)
          .fill()
          .map(() => getRandomNumber(1, -1))
      );
    this.pesos_s = Array(n_oculta)
      .fill()
      .map(() =>
        Array(n_salida)
          .fill()
          .map(() => getRandomNumber(1, -1))
      );
    this.bias_o = Array.from({ length: n_oculta }, () =>
      getRandomNumber(1, -1)
    );
    this.bias_s = Array.from({ length: n_salida }, () =>
      getRandomNumber(1, -1)
    );
    this.salidas_o = Array(n_oculta);
    this.salidas_s = Array(n_salida);
  }

  /** Clasifica el arreglo de entradas x y devuelve el arreglo con el valor de salida de las neuronas de salida
   * @param {array} x
   * @returns {array}
   */
  classify(x) {
    //Calcúlo de la salida de la capa oculta con los valores de entrada y los pesos de la capa oculta
    this.salidas_o = this.calculateSalidas(
      x,
      this.capas[0],
      this.capas[1],
      this.pesos_o,
      this.bias_o
    );
    //Calcúlo de la salida de la capa de salida con los valores de la capa oculta y los pesos de la capa de salida
    this.salidas_s = this.calculateSalidas(
      this.salidas_o,
      this.capas[1],
      this.capas[2],
      this.pesos_s,
      this.bias_s
    );

    //Regresa el arreglo resultante del calcúlo
    return this.salidas_s.map((e) => Math.round(e));
  }

  training(x, values) {
    let cambio_s = Array(this.capas[2]);
    let cambio_o = Array(this.capas[1]);

    this.classify(x);
    //Calcúlo de los cambios que se necesitan hacer en la capa de salida con la formula dY=(y'-y)Df(y)
    for (let i = 0; i < this.capas[2]; i++) {
      cambio_s[i] =
        (values[i] - this.salidas_s[i]) * dfSigmoid(this.salidas_s[i]);
    }
    //Cálculo de los cambios necesarios en la capa oculta con la formula dH=w*dY*Df(h)
    for (let i = 0; i < this.capas[1]; i++) {
      let err = 0;
      //Primero necesitamos calcúlar w*dY
      for (let j = 0; j < this.capas[2]; j++)
        err += this.pesos_s[i][j] * cambio_s[j];
      cambio_o[i] = err * dfSigmoid(this.salidas_o[i]);
    }
    //Actualizar los pesos en base a estos cambios
    this.bias_s = this.updateBias(this.bias_s, cambio_s);
    this.bias_o = this.updateBias(this.bias_o, cambio_o);
    this.pesos_s = this.updateWeights(this.pesos_s, cambio_s, this.salidas_o);
    this.pesos_o = this.updateWeights(this.pesos_o, cambio_o, x);
  }

  /** Regresa el arreglo de salida realizando la multiplicación de matrices sumado al bias
   * @param {array} x
   * @param {int} ancho
   * @param {int} alto
   * @param {array(array)} pesos
   * @param {array} bias
   * @returns {array}
   */
  calculateSalidas(x, ancho, alto, pesos, bias) {
    let salidas = [];
    let res;
    for (let i = 0; i < alto; i++) {
      res = bias[i];
      for (let j = 0; j < ancho; j++) {
        res += x[j] * pesos[j][i];
      }
      salidas[i] = fSigmoid(res);
    }
    return salidas;
  }

  /** Actualiza el bias con el array de cambios
   * @param {array} bias 
   * @param {array} cambio 
   * @returns {array} bias actualizado
   */
  updateBias(bias, cambio) {
    return bias.map((e, i) => e + this.alfa * cambio[i]);
  }

  /** Actuializa la tabla de pesos con la formula w+=a*H*dH
   * @param {array(array)} pesos 
   * @param {array} cambio 
   * @param {array} entrada 
   * @returns {array(array)} matriz de peso actualizada
   */
  updateWeights(pesos, cambio, entrada) {
    return Array(entrada.length)
      .fill()
      .map((_, i) =>
        Array(cambio.length)
          .fill()
          .map((_, j) => pesos[i][j] + entrada[i] * cambio[j] * this.alfa)
      );
  }
}
