type DayModule = {
  part1: () => void;
  part2: () => void;
};

type PlayFunction = (
  day: { part1: () => void; part2: () => void },
  flag?: string
) => void;

export const play: PlayFunction = ({ part1, part2 }, flag) => {
  if (flag === "2") {
    part2();
  } else {
    part1();
  }
};

export const getTodaysLines = async (day: string): Promise<string[]> => {
  const url = `https://adventofcode.com/2024/day/${day}/input`;
  const resp = await fetch(url, {
    headers: { Cookie: `session=${Deno.env.get("SESSION_ID")}` },
  });
  const text = await resp.text();
  const lines = text.split("\n");
  return lines.slice(0, lines.length - 1);
};
