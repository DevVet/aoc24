/**
 * Types
 */
type PageLocation = { before: Set<string>; after: Set<string> };
type Guide = Record<string, PageLocation>;

type ParsedLines = { guide: Guide; instructions: string[][] };

/**
 * Helpers
 */
const parseLines = (lines: string[]): ParsedLines => {
  const emptyLineIdx = lines.findIndex((line) => line === "");
  const instructions = lines
    .slice(emptyLineIdx + 1)
    .map((line) => line.split(","));

  const guide: Guide = lines
    .slice(0, emptyLineIdx)
    .reduce((acc: Guide, line) => {
      const [first, second] = line.split("|");
      const prop1: PageLocation = acc[first] || {
        before: new Set(),
        after: new Set(),
      };
      const prop2: PageLocation = acc[second] || {
        before: new Set(),
        after: new Set(),
      };
      prop2.after.add(first);
      prop1.before.add(second);
      return { ...acc, [first]: prop1, [second]: prop2 } as Guide;
    }, {} as Guide);

  return { guide, instructions };
};

const getMiddleNumber = (instructions: string[]): number => {
  const idx = (instructions.length - 1) / 2;
  return Number(instructions[idx]);
};

const correctUpdates =
  (guide: Guide, invert = false) =>
  (instructions: string[]) => {
    for (let i = 0; i < instructions.length - 2; i++) {
      const [left, ref, right] = instructions.slice(i, i + 3);
      const refGuide = guide[ref];
      if (refGuide.after.has(left) && refGuide.before.has(right)) {
        continue;
      }
      return invert;
    }
    return !invert;
  };

const fixUpdate =
  (guide: Guide) =>
  (instructions: string[]): string[] =>
    instructions.sort((a, b) => (guide[a].before.has(b) ? 1 : -1));

/**
 * Solutions
 */
export const part1 = (lines: string[]) => {
  const { guide, instructions } = parseLines(lines);

  const answer = instructions
    .filter(correctUpdates(guide))
    .reduce((acc, set) => acc + getMiddleNumber(set), 0);

  console.log(answer);
};

export const part2 = (lines: string[]) => {
  const { guide, instructions } = parseLines(lines);

  const answer = instructions
    .filter(correctUpdates(guide, true))
    .map(fixUpdate(guide))
    .reduce((acc, set) => acc + getMiddleNumber(set), 0);
  console.log(answer);
};
