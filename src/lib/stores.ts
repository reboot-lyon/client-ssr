import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const foo: Writable<string> = writable("bar");
