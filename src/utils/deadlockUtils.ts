
// Function to detect deadlock using Resource Allocation Graph (RAG)
export function detectDeadlockRAG(graph: Record<number, number[]>, n: number): boolean {
  const visited: boolean[] = Array(n).fill(false);
  const recursionStack: boolean[] = Array(n).fill(false);

  const isCyclicUtil = (node: number): boolean => {
    visited[node] = true;
    recursionStack[node] = true;

    for (const neighbor of graph[node] || []) {
      if (!visited[neighbor]) {
        if (isCyclicUtil(neighbor)) {
          return true;
        }
      } else if (recursionStack[neighbor]) {
        return true;
      }
    }

    recursionStack[node] = false;
    return false;
  };

  for (let node = 0; node < n; node++) {
    if (!visited[node]) {
      if (isCyclicUtil(node)) {
        return true;
      }
    }
  }
  return false;
}

// Function to check if system is in safe state using Banker's Algorithm
export function isSafeStateBanker(
  available: number[],
  maxNeed: number[][],
  allocation: number[][],
  n: number,
  m: number
): [boolean, number[]] {
  // Calculate need matrix
  const need: number[][] = maxNeed.map((row, i) => 
    row.map((val, j) => val - allocation[i][j])
  );
  
  // Clone available resources
  const work: number[] = [...available];
  const finish: boolean[] = Array(n).fill(false);
  const safeSequence: number[] = [];

  while (safeSequence.length < n) {
    let found = false;

    for (let i = 0; i < n; i++) {
      if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
        // Process can be completed
        for (let j = 0; j < m; j++) {
          work[j] += allocation[i][j];
        }
        safeSequence.push(i);
        finish[i] = true;
        found = true;
        break;
      }
    }

    if (!found) {
      return [false, []];
    }
  }

  return [true, safeSequence];
}

// Helper to create graph data structure for visualization
export function createGraphData(graph: Record<number, number[]>, n: number) {
  const nodes = Array.from({ length: n }, (_, i) => ({
    id: `P${i}`,
    color: "#9b87f5",
  }));

  const links: { source: string; target: string }[] = [];
  
  Object.entries(graph).forEach(([source, targets]) => {
    targets.forEach((target) => {
      links.push({
        source: `P${source}`,
        target: `P${target}`,
      });
    });
  });

  return { nodes, links };
}

// Parse input string into 2D array
export function parseMatrix(input: string[], m: number): number[][] {
  return input.map(row => {
    const values = row.trim().split(/\s+/).map(Number);
    if (values.length !== m) {
      throw new Error(`Expected ${m} values per row, got ${values.length}`);
    }
    return values;
  });
}

// Parse input string into array
export function parseArray(input: string): number[] {
  const values = input.trim().split(/\s+/).map(Number);
  return values;
}

// Parse waits-for graph input
export function parseWaitsForGraph(input: string[]): Record<number, number[]> {
  const graph: Record<number, number[]> = {};
  
  input.forEach((row, i) => {
    if (row.trim()) {
      graph[i] = row.trim().split(/\s+/).map(Number);
    } else {
      graph[i] = [];
    }
  });
  
  return graph;
}
