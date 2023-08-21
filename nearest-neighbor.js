const K = Number.POSITIVE_INFINITY;
const graph = [
  [0, 9, 6, 19, K, K, K, K, K],
  [9, 0, 15, 21, 23, K, K, 10, K],
  [6, 15, 0, 16, K, 32, K, K, K],
  [19, 21, 16, 0, 10, 17, K, 25, K],
  [K, 23, K, 10, 0, 7, 5, 19, 51],
  [K, K, 32, 17, 7, 0, 8, K, K],
  [K, K, K, K, 5, 8, 0, K, 47],
  [K, 10, K, 25, 19, K, K, 0, 36],
  [K, K, K, K, 51, K, 47, 36, 0],
];

const { path, price } = nearestNeighbor(graph);
console.log("Saída", path);
console.log("Custo", price);

function nearestNeighbor(graph) {
  const totalCities = graph.length;
  const path = [0]; // Adicionada cidade inicial ao conjunto solução.
  const visitedCities = [0]; // Adicionada cidade inicial ao conjunto de cidades visitadas.

  while (visitedCities.length < totalCities) {
    const actualCity = path[path.length - 1]; // Get the last city visited
    console.log(
      `actualCity: ${actualCity} path: ${path}, visitedCities: ${visitedCities}`
    );

    let shortedDistance = K;
    let nearestCity = null;

    // Search for the nearest neighbor
    for (let neighbor = 0; neighbor < totalCities; neighbor++) {
      if (!visitedCities.includes(neighbor)) {
        // Se ainda não foi visitada.
        const dist = graph[actualCity][neighbor];
        if (dist < shortedDistance) {
          shortedDistance = dist;
          nearestCity = neighbor;
        }
      }
    }

    path.push(nearestCity);
    visitedCities.push(nearestCity);
    if (nearestCity == null) {
      break;
    }
  }

  path.push(0); // Close the travel loop with initial city
  const price = calculePathPrice(path);
  return { path, price };
}

function calculePathPrice(path) {
  let price = 0;

  for (let i = 1; i < path.length; i++) {
    if (path[i] == null || path[i - 1] == null) {
      price += K;
    } else {
      const origin = path[i - 1];
      const destiny = path[i];
      price += graph[origin][destiny];
    }
  }
  console.log("Path", path);
  console.log("Price", price);
  return price;
}
