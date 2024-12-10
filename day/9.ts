class Node {
  public last: Node | null;
  public next: Node | null;
  public value: number | null;
  public position: number;

  constructor(
    position: number,
    value: number | null,
    last: Node | null = null
  ) {
    this.position = position;
    this.value = value;
    this.last = last;
    this.next = null;
  }
}

/**
 * Solutions
 */
export const part1 = ([input]: string[]) => {
  const start = new Node(0, null);
  let current = start;
  let i = 1,
    j = 0,
    k = 0;
  for (const char of input) {
    const isOddIdx = i % 2 === 1;
    new Array(Number(char))
      .fill(isOddIdx ? Number(j) : null)
      .forEach((val: number | null) => {
        current.value = val;
        current.next = new Node(k, null, current);
        current = current.next;
        k++;
      });
    if (isOddIdx) j++;
    i++;
  }
  let first = start;
  let last = current.last as Node;
  let checksum = 0;

  while (first.next) {
    if (first.value !== null) {
      checksum += first.position * first.value;
      first = first.next as Node;
    } else {
      if (last.value !== null) {
        first.value = last.value;
      }
      last = last.last as Node;
      last.next = null;
    }
  }
  console.log(checksum);
};

export const part2 = (lines: string[]) => {};
