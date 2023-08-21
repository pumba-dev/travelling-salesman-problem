const K = Number.POSITIVE_INFINITY;
const distances = [
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

const shortestPath = tspDynamicProgramming(distances);
console.log("Shortest Path Length:", shortestPath);

function tspDynamicProgramming(distances) {
  // Calculate the number of cities (nodes)
  const n = distances.length;

  // Calculate the total number of subsets (2^n)
  const numSubsets = 1 << n; // Total number of subsets

  // Initialize memoization table with -1 values
  const memo = new Array(numSubsets);
  for (let i = 0; i < numSubsets; i++) {
    memo[i] = new Array(n).fill(-1);
  }

  // Recursive function to solve subproblems
  function solve(visited, pos) {
    // Check if all cities have been visited
    if (visited === (1 << n) - 1) {
      return distances[pos][0]; // Return distance to starting city
    }

    // Check if solution for current subproblem is already calculated
    if (memo[visited][pos] !== -1) {
      return memo[visited][pos]; // Return cached result
    }

    let minCost = Infinity; // Initialize minimum cost

    // Try visiting all unvisited cities
    for (let city = 0; city < n; city++) {
      // City not yet visited
      if ((visited & (1 << city)) === 0) {
        const newVisited = visited | (1 << city); // Mark city as visited
        const cost = distances[pos][city] + solve(newVisited, city); // Calculate cost
        minCost = Math.min(minCost, cost); // Update minimum cost
      }
    }

    memo[visited][pos] = minCost; // Cache the result
    return minCost; // Return the minimum cost
  }

  // Start from city 0 and call the recursive function
  return solve(1, 0);
}
