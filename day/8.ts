/**
 * Types
 */
type Coord = { x: number; y: number };
type NodeMap = Record<string, Coord[]>;

/**
 * Helpers
 */
const parseLines = (lines: string[]): NodeMap =>
  lines.reduce((acc, line, y) => {
    line.split("").forEach((node, x) => {
      if (node !== ".") acc[node] = [...(acc[node] || []), { x, y }];
    });
    return acc as NodeMap;
  }, {} as NodeMap);

/**
 * Solutions
 */
export const part1 = (lines: string[]) => {
  const map = parseLines(lines);
  const antinodes = new Set<string>();
  Object.values(map).forEach((antennas) => {
    antennas.slice(0, antennas.length - 1).forEach(({ x: x1, y: y1 }, idx) => {
      antennas.slice(idx + 1).forEach(({ x: x2, y: y2 }) => {
        const [slopeX, slopeY] = [x2 - x1, y2 - y1] as [number, number];
        [
          { x: x1 - slopeX, y: y1 - slopeY },
          { x: x2 + slopeX, y: y2 + slopeY },
        ]
          .filter(({ x, y }) => x >= 0 && y >= 0 && x < 50 && y < 50)
          .forEach((c) => antinodes.add(JSON.stringify(c)));
      });
    });
  });
  console.log(antinodes.size);
};

export const part2 = (lines: string[]) => {
  const map = parseLines(lines);
  const antinodes = new Set<string>();
  Object.values(map).forEach((antennas) => {
    antennas.slice(0, antennas.length - 1).forEach((pt1, idx) => {
      const { x: x1, y: y1 } = pt1;
      antennas.slice(idx + 1).forEach((pt2) => {
        const { x: x2, y: y2 } = pt2;
        const [slopeX, slopeY] = [x2 - x1, y2 - y1] as [number, number];
        const diff = (i: number) => [slopeX * i, slopeY * i];
        const candidates = [pt1, pt2] as Coord[];
        for (
          let i = 1;
          (x1 - slopeX * 1 >= 0 && y1 - slopeY * i >= 0) ||
          (x2 + slopeX * 1 < 50 && y2 + slopeY * i < 50);
          i++
        ) {
          const [diffX, diffY] = diff(i);
          if (x1 - diffX >= 0 && y1 - diffY >= 0)
            candidates.push({ x: x1 - diffX, y: y1 - diffY });
          if (x2 + diffX < 50 && y2 + diffY < 50)
            candidates.push({ x: x2 + diffX, y: y2 + diffY });
        }
        candidates
          .filter(({ x, y }) => x >= 0 && y >= 0 && x < 50 && y < 50)
          .forEach((c) => antinodes.add(JSON.stringify(c)));
      });
    });
  });
  console.log(antinodes.size);
};
