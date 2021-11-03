//Función sigmoide
const fSigmoid = (x) => {
  return 1 / (1 + Math.exp(-x));
};
//Derivada de sigmoide
const dfSigmoid = (x) => {
  return fSigmoid(x) * (1 - fSigmoid(x));
};

//Función por paso
const fStep = (x) => {
  return x > 0 ? 1 : -1;
};
