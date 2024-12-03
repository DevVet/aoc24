import { parseArgs } from "jsr:@std/cli/parse-args";
import "jsr:@std/dotenv/load";
import * as day1 from "./day/1.ts";
import * as day2 from "./day/2.ts";
import * as day3 from "./day/3.ts";
import { play } from "./utils.ts";

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: ["day", "part"],
  });

  switch (flags.day) {
    case "1":
      play(day1, flags.part);
      break;
    case "2":
      play(day2, flags.part);
      break;
    case "3":
      play(day3, flags.part);
      break;
    default:
      throw new Error(
        `Must include the day to run, which must be a number between 1 - ${
          new Date().getDay() + 1
        }`
      );
  }
}
