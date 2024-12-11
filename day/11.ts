// Original answer was O(n^2) so converted with help from https://programming.dev/post/22710192#comment-13834559 to
// convert this to a recurcive algorithm using a hashtable cache

/**
 * Helpers
 */
const blink = (stone: number) => {
  if (stone === 0) return [1];
  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    return [
      Number(stoneStr.slice(0, stoneStr.length / 2)),
      Number(stoneStr.slice(stoneStr.length / 2)),
    ];
  }
  return [stone * 2024];
};

const getLength = (
  stone: number,
  blinks: number,
  cache = new Map<string, number>()
): number => {
  if (blinks === 0) return 1;
  const cacheKey = [stone, blinks].toString();
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  const sum = blink(stone).reduce(
    (acc, val) => acc + getLength(val, blinks - 1, cache),
    0
  );
  cache.set(cacheKey, sum);
  return sum;
};

const solve = (stones: number[], blinks: number) => {
  return stones
    .map((stone) => getLength(stone, blinks))
    .reduce((acc, val) => acc + val, 0);
};

/**
 * Solutions
 */
export const part1 = ([line]: string[]) => {
  const stones = line.split(" ").map(Number);
  console.log(solve(stones, 25));
};

export const part2 = ([line]: string[]) => {
  const stones = line.split(" ").map(Number);
  console.log(solve(stones, 75));
};
