const k = Number.POSITIVE_INFINITY;
const graph = [
  [0, 2, k, 3, 6],
  [2, 0, 4, 3, k],
  [k, 4, 0, 7, 3],
  [3, 3, 7, 0, 3],
  [6, k, 3, 3, 0],
];
// const graph = [
//   [0, 5, 3, 8],
//   [5, 0, 2, 1],
//   [3, 2, 0, 1],
//   [8, 1, 1, 0],
// ];

const numCidades = graph.length;

// withou initial node (1)
const arrayToPermutation = createPermutationArray(2, numCidades);
console.log("Array para Permutação: ", arrayToPermutation);

const permutedArray = permuteList(arrayToPermutation);
console.log("Array Permutado: ", permutedArray);

const possibleRoutes = addInitialNode(permutedArray);
console.log("Possíveis Caminhos: ", possibleRoutes);

const routesValues = calcRoutesValues(possibleRoutes, graph);
console.log("Valor dos Caminhos: ", routesValues);

const minValueIndex = calcMinValueIndex(routesValues);
console.log("Index do Menor Caminho: ", minValueIndex);

const minRoute = possibleRoutes[minValueIndex];
const minValue = routesValues[minValueIndex];

console.log("Saída: ", minRoute);
console.log("Peso: ", minValue);

function createPermutationArray(init, end) {
  const length = end - init + 1;
  const array = new Array(length).fill(init);
  array.forEach((value, index) => {
    array[index] = value + index;
  });
  return array;
}

function permuteList(array) {
  if (array.length == 1) {
    return [array];
  }

  let result = [];

  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i];
    const remainingElements = array.slice(0, i).concat(array.slice(i + 1));
    const remainingPermutations = permuteList(remainingElements);

    for (let j = 0; j < remainingPermutations.length; j++) {
      result.push([currentElement].concat(remainingPermutations[j]));
    }
  }

  return result;
}

function addInitialNode(array) {
  return array.map((list) => {
    return [1, ...list, 1];
  });
}

function calcRoutesValues(permutations, grafh) {
  let permutationsValues = [];

  for (let i = 0; i < permutations.length - 1; i++) {
    const permutation = permutations[i];
    let value = 0;

    for (let j = 0; j < permutation.length - 1; j++) {
      const origin = permutation[j];
      const destiny = permutation[j + 1];
      value += grafh[origin - 1][destiny - 1];
    }

    permutationsValues.push(value);
  }

  return permutationsValues;
}

function calcMinValueIndex(array) {
  let min = array[0];
  let minValueIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
      minValueIndex = i;
    }
  }

  return minValueIndex;
}
