# Perceptrón - Redes Neuronales

Clasificador de puntos con dos neuronas en la capa de salida

## Darien Ramírez Chaidez

### 04/11/2021

# Funcionamiento

## Perceptron.js

La red neuronal al ser creado recibe la _n_ cantidad de entradas, neuronas de la capa oculta, neuronas de saliday la tasa de aprendizaje para ser creada, de ahí asigna pesos aleatorios a las correspondientes matrices entre dos datos constantes y el bias de igual manera, también se crean arreglos auxiliares para guardar los resultados de cada capa.

```js
  constructor(n_entrada, n_oculta, n_salida, alfa) {
    this.capas = [n_entrada, n_oculta, n_salida];
    this.alfa = alfa;
    this.pesos_o = Array(n_entrada).fill().map(() =>
        Array(n_oculta).fill() .map(() => getRandomNumber(1, -1)));
    this.pesos_s = Array(n_oculta).fill().map(() =>
        Array(n_salida).fill().map(() => getRandomNumber(1, -1)));
    this.bias_o = Array.from({ length: n_oculta }, () => getRandomNumber(1, -1));
    this.bias_s = Array.from({ length: n_salida }, () => getRandomNumber(1, -1));
    this.salidas_o = Array(n_oculta);
    this.salidas_s = Array(n_salida);
  }
```

La función clasificar se encarga de llenar los arreglos de salidas de cada capa, usa una función auxiliar que recibe los datos de entrada, el ancho y el alto de la matriz, la matriz de pesos y el bias y regresa el arreglo resultante correspondiente, básicamente es una multiplicación de matrices y el resultado es pasado por la función de activación sigmoide.
Esta función sigue la estructura de la formula h=f(W\*x+_b_)

```js
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
```

La función classify llama esta función para los datos de cada capa y regresa el arreglo resultante redondeado.

```js
  classify(x) {
    this.salidas_o = this.calculateSalidas(x, this.capas[0],
      this.capas[1],this.pesos_o, this.bias_o);
    this.salidas_s = this.calculateSalidas(this.salidas_o,
      this.capas[1],this.capas[2],this.pesos_s,this.bias_s);
    return this.salidas_s.map((e) => Math.round(e));
  }
```

Ahora para entrenar la RNA primero se calcúlan los arreglos de cambios necesarios restando el valor real al conseguido y multiplicando por la derivada de la sigmoide de la salida, con la formula dY=(y'-y)Df(y) para la capa de salida y dH= w*dY *Df(h) para la capa oculta

```js
//dY
for (let i = 0; i < this.capas[2]; i++) {
  cambio_s[i] =
    (values[i] - Math.round(this.salidas_s[i])) * dfSigmoid(this.salidas_s[i]);
}
//dH
for (let i = 0; i < this.capas[1]; i++) {
  let err = 0;
  for (let j = 0; j < this.capas[2]; j++)
    err += this.pesos_s[i][j] * cambio_s[j];
  cambio_o[i] = err * dfSigmoid(this.salidas_o[i]);
}
```

Despues se actualizan los pesos y los bias en base a este cambio, se le suma, para esto se usan funciones auxiliares que se encargan de recorrer los arreglos para sumar el dato correspondiente, estas funciones, reciben el arreglo a ser alterado (bias y peso) según corresponda, el arreglo con los cambios a ser sumados y en el caso de los pesos la entrada a la cual se le va aplicar la derivada de la sigmoide como marcan las formulas
bias = _b_ + alfa*dY
peso = w + alfa*h \*dY

```js
  updateBias(bias, cambio) {
    return bias.map((e, i) => e + this.alfa * cambio[i]);
  }

  updateWeights(pesos, cambio, entrada) {
    return Array(entrada.length).fill().map((_, i) =>
      Array(cambio.length)
        .fill()
        .map((_, j) => pesos[i][j] + entrada[i] * cambio[j] * this.alfa)
    );
  }
```

La función calculate termina con la llamada a estas funciones en base a los cambios conseguidos hace dos pasos.

```js
this.bias_s = this.updateBias(this.bias_s, cambio_s);
this.bias_o = this.updateBias(this.bias_o, cambio_o);
this.pesos_s = this.updateWeights(this.pesos_s, cambio_s, this.salidas_o);
this.pesos_o = this.updateWeights(this.pesos_o, cambio_o, x);
```

## Punto.js

El punto solo recibe coordenadas y el tipo, y tiene un método para ser pintado en el canvas con P5 y un getter para regresar el arreglo de las coordenadas.

## Sketch.js

El sketch se usa para pintar el canvas y manejar los objetos de punto y la red neuronal.

La parte importante biene en la creación de puntos dentro de los circulos dibujados para que la red neuronal entrene.

```js
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
```

# Salida:

[GitHub Pages](https://chaidez13.github.io/perceptron_RNA/)
![Gif del funcionamiento](/src/assets/rna.gif)
