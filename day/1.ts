import { getTodaysLines } from "../utils.ts";

/**
 * Helpers
 */
const splitAndSort = (lines: string[]) =>
  lines.reduce<[number[], number[]]>(
    (acc, line) => {
      const [left, right] = line.split("   ").map(Number);
      return [[...acc[0], left].sort(), [...acc[1], right].sort()];
    },
    [[], []]
  );

/**
 * Solutions
 */
export const part1 = async () => {
  const lines = await getTodaysLines("1");
  const [col1, col2] = splitAndSort(lines);
  const answer = col1.reduce((acc, val, i) => acc + Math.abs(val - col2[i]), 0);
  console.log(answer);
};

export const part2 = async () => {
  const lines = await getTodaysLines("1");
  const [col1, col2] = splitAndSort(lines);
  const countMap = col2.reduce<Map<number, number>>(
    (acc, item) => acc.set(item, (acc.get(item) || 0) + 1),
    new Map()
  );
  const answer = col1.reduce(
    (acc, item) => acc + (countMap.get(item) || 0) * item,
    0
  );
  console.log(answer);
};
