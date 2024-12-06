import { parseArgs } from "jsr:@std/cli/parse-args";
import "jsr:@std/dotenv/load";
import { play } from "./utils.ts";

if (import.meta.main) {
  const {day = "1", part = "1"} = parseArgs(Deno.args, {
    string: ["day", "part"],
  });

  const module = await import(`./day/${day}.ts`);
  play({module, part, day});
}
