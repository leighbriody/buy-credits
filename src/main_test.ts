import { assertEquals } from "@std/assert";
import { buyCredits } from "./mod.ts";

Deno.test(function addTest() {
  assertEquals(buyCredits(), true);
});
