const k = Number.POSITIVE_INFINITY;
// const graph = [
//   [0, 9, 6, 19, k, k, k, k, k],
//   [9, 0, 15, 21, 23, k, k, 10, k],
//   [6, 15, 0, 16, k, 32, k, k, k],
//   [19, 21, 16, 0, 10, 17, k, 25, k],
//   [k, 23, k, 10, 0, 7, 5, 19, 51],
//   [k, k, 32, 17, 7, 0, 8, k, k],
//   [k, k, k, k, 5, 8, 0, k, 47],
//   [k, 10, k, 25, 19, k, k, 0, 36],
//   [k, k, k, k, 51, k, 47, 36, 0],
// ];
const graph = [
  [
    0, 29, 20, 21, 16, 12, 10, 28, 14, 18, 25, 22, 27, 19, 24, 26, 30, 17, 23,
    15,
  ],
  [
    29, 0, 15, 18, 12, 25, 23, 9, 13, 16, 21, 14, 20, 27, 22, 26, 31, 19, 24,
    30,
  ],
  [
    20, 15, 0, 16, 25, 8, 14, 19, 27, 29, 10, 11, 17, 22, 30, 32, 21, 28, 12,
    13,
  ],
  [21, 18, 16, 0, 11, 22, 24, 17, 15, 7, 23, 26, 31, 20, 13, 10, 9, 29, 25, 14],
  [16, 12, 25, 11, 0, 21, 8, 6, 30, 17, 19, 24, 14, 28, 23, 15, 13, 27, 22, 9],
  [
    12, 25, 8, 22, 21, 0, 16, 29, 18, 26, 20, 15, 19, 11, 23, 14, 30, 17, 27,
    13,
  ],
  [
    10, 23, 14, 24, 8, 16, 0, 12, 30, 25, 28, 21, 27, 29, 13, 19, 20, 26, 15,
    18,
  ],
  [28, 9, 19, 17, 6, 29, 12, 0, 22, 14, 31, 10, 18, 26, 23, 21, 16, 25, 27, 30],
  [
    14, 13, 27, 15, 30, 18, 30, 22, 0, 11, 25, 16, 24, 19, 17, 14, 28, 20, 31,
    26,
  ],
  [18, 16, 29, 7, 17, 26, 25, 14, 11, 0, 12, 19, 29, 21, 8, 15, 27, 10, 23, 31],
  [25, 21, 10, 23, 19, 20, 28, 31, 25, 12, 0, 9, 16, 14, 27, 30, 20, 8, 26, 11],
  [22, 14, 11, 26, 24, 15, 21, 10, 16, 19, 9, 0, 25, 12, 18, 29, 23, 31, 7, 27],
  [
    27, 20, 17, 31, 14, 19, 27, 18, 24, 29, 16, 25, 0, 8, 21, 23, 13, 10, 26,
    22,
  ],
  [
    19, 27, 22, 20, 28, 11, 29, 26, 19, 21, 14, 12, 8, 0, 25, 17, 16, 30, 23,
    15,
  ],
  [24, 22, 30, 13, 23, 23, 13, 23, 17, 8, 27, 18, 21, 25, 0, 14, 22, 9, 20, 16],
  [
    26, 26, 32, 10, 15, 14, 19, 21, 14, 15, 30, 29, 23, 17, 14, 0, 18, 19, 22,
    11,
  ],
  [
    30, 31, 21, 9, 13, 30, 20, 16, 28, 27, 20, 23, 13, 16, 22, 18, 0, 10, 14,
    25,
  ],
  [17, 19, 28, 29, 27, 17, 26, 25, 20, 10, 8, 31, 10, 30, 9, 19, 10, 0, 21, 22],
  [
    23, 24, 12, 25, 22, 27, 15, 27, 31, 23, 26, 7, 26, 23, 20, 22, 14, 21, 0,
    18,
  ],
  [
    15, 30, 13, 14, 9, 13, 18, 30, 26, 31, 11, 27, 22, 15, 16, 11, 25, 22, 18,
    0,
  ],
];

BruteForce(graph);

function BruteForce(graph) {
  const numCidades = graph.length;

  // withou initial node (1)
  const arrayToPermutation = createPermutationArray(2, numCidades);
  // console.log("Array para Permutação: ", arrayToPermutation);

  const permutedArray = permuteList(arrayToPermutation);
  // console.log("Array Permutado: ", permutedArray);

  const possibleRoutes = addInitialNode(permutedArray);
  // console.log("Possíveis Caminhos: ", possibleRoutes);

  const routesValues = calcRoutesValues(possibleRoutes, graph);
  // console.log("Valor dos Caminhos: ", routesValues);

  const minValueIndex = calcMinValueIndex(routesValues);
  // console.log("Index do Menor Caminho: ", minValueIndex);

  const minRoute = possibleRoutes[minValueIndex];
  const minValue = routesValues[minValueIndex];

  console.log("Saída: ", minRoute);
  console.log("Peso: ", minValue);

  return minRoute;
}

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

  for (let i = 0; i < permutations.length; i++) {
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
