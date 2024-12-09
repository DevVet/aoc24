/**
 * Helpers
 */
const parseLine = (
  line: string
): { calibrationResult: number; values: string[] } => {
  const [calibrationResultStr, values] = line.split(": ");

  return {
    calibrationResult: Number(calibrationResultStr),
    values: values.split(" "),
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
    const { calibrationResult, values } = parseLine(line);
    const isValid = isOperable(Number(values[0]), [
      ...values.slice(1),
      calibrationResult.toString(),
    ]);
    if (isValid) {
      sum += calibrationResult;
    }
  }
  console.log(sum);
};

export const part2 = (lines: string[]) => {
  let sum = 0;
  for (const line of lines) {
    const { calibrationResult, values } = parseLine(line);
    const isValid = isOperable(
      Number(values[0]),
      [...values.slice(1), calibrationResult.toString()],
      true
    );
    if (isValid) sum += calibrationResult;
  }
  console.log(sum);
};
