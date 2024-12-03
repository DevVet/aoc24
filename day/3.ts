import { getTodaysLines } from "../utils.ts";

/**
 * Solutions
 */
export const part1 = async () => {
  const lines = await getTodaysLines("3");
  let sum = 0;
  lines.forEach((line) => {
    line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g).forEach((match) => {
      sum += Number(match[1]) * Number(match[2]);
    });
  });
  console.log(sum);
};

export const part2 = async () => {
  const lines = await getTodaysLines("3");
  let sum = 0;
  let isEnabled = true;
  lines.forEach((line) => {
    line
      .matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)
      .forEach((match) => {
        if (match[1] && match[2]) {
          if (isEnabled) sum += Number(match[1]) * Number(match[2]);
        } else {
          isEnabled = match[0] === "do()";
        }
      });
  });
  console.log(sum);
};
