/**
 * Helpers
 */
const parseLine = (
  line: string
): { result: number; first: number; rest: string[] } => {
  const [calibrationResult, rest] = line.split(": ");
  const values = rest.split(" ");
  const first = Number(values[0]);

  return {
    first,
    rest: [...values.slice(1), calibrationResult],
    result: Number(calibrationResult),
  };
};

const isOperable = (
  first: number,
  rest: string[],
  includeConcat = false
): boolean => {
  const second = Number(rest[0]);
  if (rest.length === 1) return first === second;

  let answer =
    isOperable(first * second, rest.slice(1), includeConcat) ||
    isOperable(first + second, rest.slice(1), includeConcat);

  if (includeConcat) {
    answer =
      answer ||
      isOperable(Number(`${first}${second}`), rest.slice(1), includeConcat);
  }
  return answer;
};

/**
 * Solutions
 */
export const part1 = (lines: string[]) => {
  let sum = 0;
  for (const line of lines) {
    const { result, first, rest } = parseLine(line);
    const isValid = isOperable(first, rest);
    if (isValid) {
      sum += result;
    }
  }
  console.log(sum);
};

export const part2 = (lines: string[]) => {
  let sum = 0;
  for (const line of lines) {
    const { result, first, rest } = parseLine(line);
    const isValid = isOperable(first, rest, true);
    if (isValid) sum += result;
  }
  console.log(sum);
};
