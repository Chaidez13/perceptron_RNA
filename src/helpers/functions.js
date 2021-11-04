// ===================== Funciones de activación ==========================
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

//========================= Métodos auxiliares =============================
const getRandomNumber = (max = 1, min = 0) => {
  return Math.random() * (max - min) + min;
};

const categorizar = (x) => {
  if (x[0] === 1 && x[1] == 0) return 1;
  else if (x[0] === 0 && x[1] == 1) return 2;
  else return 0;
};
