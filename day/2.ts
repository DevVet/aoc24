import { getTodaysLines } from "../utils.ts";

/**
 * Helpers
 */
const isSafe = (line: number[]): boolean => {
  const isIncreasing = line[1] > line[0];
  for (let i = 1; i < line.length; i++) {
    const [a, b] = [line[i - 1], line[i]];
    const diff = Math.abs(a - b);
    if (![1, 2, 3].includes(diff) || (isIncreasing ? a > b : b > a))
      return false;
  }
  return true;
};

const isSafeWithTolerance = (line: number[]): boolean => {
  const dropEach = line.map((_, idx) => {
    const copy = [...line];
    copy.splice(idx, 1);
    return isSafe(copy);
  });
  return [isSafe(line), ...dropEach].some((val) => val);
};

/**
 * Solutions
 */
export const part1 = async () => {
  const lines = await getTodaysLines("2");
  const answer = lines.reduce<number>(
    (acc, lineStr) => (isSafe(lineStr.split(" ").map(Number)) ? acc + 1 : acc),
    0
  );
  console.log(answer);
};

export const part2 = async () => {
  const lines = await getTodaysLines("2");
  const answer = lines.reduce<number>((acc, lineStr) => {
    const line = lineStr.split(" ").map(Number);
    return isSafeWithTolerance(line) ? acc + 1 : acc;
  }, 0);
  console.log(answer);
};
