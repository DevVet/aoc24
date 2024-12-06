type DayModule = {
  part1: (lines: string[]) => void;
  part2: (lines: string[]) => void;
};

type PlayFunctionProps = {
  module: DayModule;
  part?: string;
  day: string
}

type PlayFunction = (props: PlayFunctionProps) => Promise<void>;

export const getTodaysLines = async (day: string): Promise<string[]> => {
  const url = `https://adventofcode.com/2024/day/${day}/input`;
  const resp = await fetch(url, {
    headers: { Cookie: `session=${Deno.env.get("SESSION_ID")}` },
  });
  const text = await resp.text();
  const lines = text.split("\n");
  return lines.slice(0, lines.length - 1);
};

export const play: PlayFunction = async ({ module: { part1, part2 }, part, day}) => {
  const lines = await getTodaysLines(day)
  if (part === "2") {
    part2(lines);
  } else {
    part1(lines);
  }
};