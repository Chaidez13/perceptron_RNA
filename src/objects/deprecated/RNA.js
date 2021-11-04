//Clase RNA Obsoleta
//Quise probar una manera generica para ingresar más neuronas y capas, pero no funcionó


class RNA {
  /**
   * Constructor de la red neuronal
   * @constructor
   * @param {int} capas
   * @param {array} neuronas_capa
   * @param {float} tasa
   */
  constructor(capas, neuronas_capa, tasa) {
    this.pesos = [];
    this.bias = [];
    this.salidas = [];
    this.nc = neuronas_capa;
    this.alfa = tasa;
    for (let i = 0; i < capas - 1; i++) {
      this.pesos[i] = new Array(neuronas_capa[i]);
      this.bias[i] = new Array(neuronas_capa[i + 1]);
      this.salidas[i] = new Array(neuronas_capa[i + 1]);
      for (let j = 0; j < neuronas_capa[i]; j++) {
        this.pesos[i][j] = new Array(neuronas_capa[j + 1]);
        for (let k = 0; k < neuronas_capa[i + 1]; k++) {
          this.pesos[i][j][k] = this.pesoInicial();
          this.bias[i][k] = this.pesoInicial();
        }
      }
    }
  }

  /**
   * Función para clasificar un arreglo de n_c[0] valores
   * @param {array} x
   * @returns {array}
   */
  clasificar(x) {
    let sum;
    let y = [];

    //TODO Probar unir estas dos funciones
    if (x.length === this.nc[0]) {
      //Calcúlo de la primer salida en base a la capa de entrada
      for (let j = 0; j < this.nc[1]; j++) {
        sum = this.bias[0][j];
        for (let k = 0; k < this.nc[0]; k++) {
          sum += x[k] * this.pesos[0][k][j];
        }
        this.salidas[0][j] = sum;
      }

      //Calcúlo de las demas salidas en base a las capas ocultas
      for (let i = 1; i < this.nc.length - 1; i++) {
        for (let j = 0; j < this.nc[i + 1]; j++) {
          sum = this.bias[i][j];
          for (let k = 0; k < this.nc[i]; k++) {
            sum += this.salidas[i - 1][j] * this.pesos[i][k][j];
          }
          this.salidas[i][j] = sum;
        }
      }

      /** Unificado (?)
       for (let i = 0; i < this.nc.length - 1; i++) {
        for (let j = 0; j < this.nc[i + 1]; j++) {
          sum = this.bias[i][j];
          for (let k = 0; k < this.nc[i]; k++) {
            sum +=
              (i === 0 ? x[k] : this.salidas[i - 1][j]) * this.pesos[i][k][j];
          }
          this.salidas[i][j] = sum;
        }
      }
       */

      return this.salidas[this.nc.length - 2].map((e) => Math.round(e));
    } else {
      console.log("Las cantidad de entradas no conincide");
      return false;
    }
  }

  /**
   * Entrenar la rna en base a un array de entrdas y el de los resultados esperados para ese array
   * @param {array} x
   * @param {array} value
   */
  entrenar(x, value) {
    if (
      x.length === this.nc[0] &&
      value.length === this.nc[this.nc.length - 1]
    ) {
      //Clasificamos los valores ingresados
      this.clasificar(x);
      //console.log(value, this.salidas[this.salidas.length - 1])

      let cambio = [];
      cambio[this.salidas.length - 1] = new Array(this.nc[this.nc.length - 1]);

      //Calcúlo de los errores de la capa de salida con base a los resultados esperados
      for (let i = 0; i < this.nc[this.nc.length - 1]; i++) {
        const error =
          value[i] - Math.round(this.salidas[this.nc.length - 2][i]);

        //console.log(error)
        //console.log(this.salidas[this.salidas.length-1][0])
        //console.log(dfSigmoid(this.salidas[this.salidas.length-1][0]))
        cambio[this.salidas.length - 1][i] =
          error * dfSigmoid(this.salidas[this.salidas.length - 1][i]);
      }

      //console.log(cambio)

      //Cálculo de los errores de las demas capas internas en base a la anterior
      for (let i = this.nc.length - 3; i >= 0; i--) {
        cambio[i] = new Array(this.salidas[i].length);
        for (let j = 0; j < this.nc[i + 1]; j++) {
          let err = 0;
          for (let k = 0; k < this.nc[i + 2]; k++) {
            //debugger
            err +=
              cambio[i + 1][k] * this.pesos[this.salidas.length - 1 - i][j][k];
          }
          //console.log(err, dfSigmoid(this.salidas[i][j]))
          cambio[i][j] = err * dfSigmoid(this.salidas[i][j]);
        }
      }
      //console.log(cambio)
      //console.log(this.pesos);
      //Se actualizan los pesos con base a los cambios por la tasa de aprendizaje
      for (let i = 0; i < this.pesos.length; i++) {
        for (let j = 0; j < this.nc[i]; j++) {
          for (let k = 0; k < this.nc[i + 1]; k++) {
            this.bias[i][k] += cambio[i][k];
            //console.log(i === 0 ? x[j] : this.salidas[i][k]*cambio[i][k]*this.alfa)
            this.pesos[i][j][k] +=
              (i === 0 ? x[j] : this.salidas[i][k]) * cambio[i][k] * this.alfa;
          }
        }
      }
      console.log(this.pesos);
    } else {
      console.log("Las cantidad de entradas y salidas no conincide");
      return false;
    }
  }

  pesoInicial(max = 1, min = 0) {
    return Math.random() * (max - min) + min;
  }
}
