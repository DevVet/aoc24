import { parseArgs } from "jsr:@std/cli/parse-args";
import "jsr:@std/dotenv/load";
import { play } from "./utils.ts";

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: ["day", "part"],
  });

  const module = await import(`./day/${flags.day}.ts`);
  play(module, flags.part);
}
