# Perceptrón - Redes Neuronales

Perceptrón simple para la clase de redes neuronales artificiales

## Darien Ramírez Chaidez

### 26/10/2021

<br/>

# Funcionamiento

## Perceptron.js

El peceptrón al ser creado recibe la _n_ cantidad de entradas y la tasa de aprendizaje para ser creada, de ahí asigna pesos aleatorios entre dos datos constantes y el bias de igual manera.

```js
  constructor(n_inputs, alfa) {
    this.weights = [];
    for (let i = 0; i < n_inputs; i++) {
      this.weights[i] = Math.random() * (MAX - MIN) + MIN;
    }
    this.bias = Math.random() * (MAX - MIN) + MIN;
    this.alfa = alfa;
  }
```

La función clasificar es la que se encarga de multiplicar los pesos por las entradas y sumarlos con el método propio de los array; reduce, el cual ejecuta una función reductora para cada elemento dentro del array, para luego sumar el bias y devolver el valor despues de aplicar la función, en este caso, la función sigmoide.

```js
  clasificar(inputs) {
    const reducer = (cV, pV, i) => pV * this.weights[i] + cV;
    return this.fSigmoid(inputs.reduce(reducer, 0) + this.bias);
  }
```

Función sigmoide:

```js
fSigmoid(x);
return 1 / (1 + Math.exp(-x));
```

Para entrenar la neurona usamos la formula básica de entrenamiento, que consiste clasificar los datos en base a los pesos actuales, luego restarle el valor real al resultado y ajustar los pesos y el bias en base a ese error multiplicado por la tasa de aprendizaje para moverse a pasos más pequeños y evitar que se reconfigure solo con la última entrada.

```js
  entrenamiento(inputs, value) {
    const a = this.clasificar(inputs);
    const e = value - a;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += inputs[i] * e * this.alfa;
    }
    this.bias += e * a;
  }
```

## Punto.js

El punto solo recibe coordenadas y el tipo, y tiene un método para ser pintado en el canvas con P5

## Sketch.js

El sketch se usa para pintar el canvas y manejar los objetos de punto y perceptron, aquí se crean muchos puntos de manera fija que son los necesarios para ver como se va actualizando los pesos y consiguiendo el resultado deseado.

La única parte importante del código sería donde se clasifican los puntos del arreglo de puntos y se crea uno nuevo aleatorio con X y Y en el rango de tamaño del canvas y su resultado dado por la formula Y = M*X + B (se desprecia B al ser 0) para que el perceptrón _entrene_.

```js
  puntos.forEach((e) => {
    e.type = perceptron.clasificar([e.x, e.y]);
    e.draw();
  });

  let x = Math.random() * (2 * xCenter) - xCenter;
  let y = Math.random() * (2 * yCenter) - yCenter;
  perceptron.entrenamiento([x, y], y > M * x ? 1 : -1);
```

# Salida:

![Gif del funcionamiento](/src/assets/PRNA.gif)
