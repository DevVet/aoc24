type Coord = {
  x: number;
  y: number;
};

class Trailhead {
  public coord: Coord;
  public peaks: Set<string>;
  public uniques: Set<string>;
  constructor(coord: Coord) {
    this.coord = coord;
    this.peaks = new Set<string>();
    this.uniques = new Set<string>();
  }
}

/**
 * Helpers
 */
const hike = (coords: Coord[], map: number[][], trailhead: Trailhead) => {
  const coord = coords.at(-1)!;
  const current = map[coord.y][coord.x];
  if (current === 9) {
    trailhead.uniques.add(JSON.stringify(coords));
    trailhead.peaks.add(JSON.stringify(coord));
  } else {
    [
      { ...coord, x: coord.x + 1 },
      { ...coord, x: coord.x - 1 },
      { ...coord, y: coord.y + 1 },
      { ...coord, y: coord.y - 1 },
    ]
      .filter(
        (next) =>
          next.x >= 0 &&
          next.x < map[0].length &&
          next.y >= 0 &&
          next.y < map.length &&
          map[next.y][next.x] === current + 1
      )
      .forEach((next) => {
        hike([...coords, next], map, trailhead);
      });
  }
};

/**
 * Solutions
 */
export const part1 = (lines: string[]) => {
  const trailheads = [] as Trailhead[];
  const map = lines.map((line, y) =>
    line.split("").map((char, x) => {
      const value = Number(char);
      if (value === 0) trailheads.push(new Trailhead({ x, y }));
      return value;
    })
  );
  const sum = trailheads.reduce((acc, trailhead) => {
    hike([trailhead.coord], map, trailhead);
    return acc + trailhead.peaks.size;
  }, 0);
  console.log(sum);
};

export const part2 = (lines: string[]) => {
  const trailheads = [] as Trailhead[];
  const map = lines.map((line, y) =>
    line.split("").map((char, x) => {
      const value = Number(char);
      if (value === 0) trailheads.push(new Trailhead({ x, y }));
      return value;
    })
  );
  const sum = trailheads.reduce((acc, trailhead) => {
    hike([trailhead.coord], map, trailhead);
    return acc + trailhead.uniques.size;
  }, 0);
  console.log(sum);
};
