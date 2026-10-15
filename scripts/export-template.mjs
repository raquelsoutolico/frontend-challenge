import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const templateDir = path.join(root, "template");
const sharedDir = path.join(root, "packages", "shared");
const outDir = path.join(root, "template-export");
const sharedItems = ["tokens.css", "data", "mock-api"];

await rm(outDir, { recursive: true, force: true });

await cp(templateDir, outDir, {
  recursive: true,
  filter: (source) => !source.includes("node_modules"),
});

const outShared = path.join(outDir, "src", "shared");
await mkdir(outShared, { recursive: true });

for (const item of sharedItems) {
  await cp(path.join(sharedDir, item), path.join(outShared, item), { recursive: true });
}

console.log(`Plantilla exportada en ${path.relative(root, outDir)}/`);
