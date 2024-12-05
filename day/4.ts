import { getTodaysLines } from "../utils.ts";

/**
 * Solutions
 */
export const part1 = async () => {
  const g = (await getTodaysLines("4")).map((line) => line.split(""));
  let count = 0;
  for (let r = 0; r < g.length; r++) {
    for (let c = 0; c < g[r].length; c++) {
      const words: string[] = [];
      const checkRight = c < g[r].length - 3;
      const checkLeft = c >= 3;
      const checkDown = r < g.length - 3;
      const checkDiagRight = checkRight && checkDown;
      const checkDiagLeft = checkLeft && checkDown;
      if (checkRight)
        words.push(g[r][c] + g[r][c + 1] + g[r][c + 2] + g[r][c + 3]);
      if (checkDiagRight)
        words.push(
          g[r][c] + g[r + 1][c + 1] + g[r + 2][c + 2] + g[r + 3][c + 3]
        );
      if (checkDown)
        words.push(g[r][c] + g[r + 1][c] + g[r + 2][c] + g[r + 3][c]);
      if (checkDiagLeft)
        words.push(
          g[r][c] + g[r + 1][c - 1] + g[r + 2][c - 2] + g[r + 3][c - 3]
        );
      count += words.filter((word) => ["XMAS", "SAMX"].includes(word)).length;
    }
  }
  console.log(count);
};

export const part2 = async () => {
  const g = (await getTodaysLines("4")).map((line) => line.split(""));
  let count = 0;
  for (let r = 1; r < g.length - 1; r++) {
    for (let c = 1; c < g[r].length - 1; c++) {
      const test = ["MAS", "SAM"];
      const diag1 = test.includes(g[r - 1][c - 1] + g[r][c] + g[r + 1][c + 1]);
      const diag2 = test.includes(g[r - 1][c + 1] + g[r][c] + g[r + 1][c - 1]);
      if (diag1 && diag2) count++;
    }
  }
  console.log(count);
};
