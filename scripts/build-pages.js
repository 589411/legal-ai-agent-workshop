import {cp, mkdir, rm, writeFile} from "node:fs/promises";
import {join} from "node:path";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

await rm(dist, {recursive: true, force: true});
await mkdir(dist, {recursive: true});

await cp(new URL("../web/index.html", import.meta.url), join(dist.pathname, "index.html"));

for (const directory of ["web", "data", "presentation"]) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`../dist/${directory}/`, import.meta.url), {
    recursive: true,
  });
}

await mkdir(new URL("../dist/remotion/out/", import.meta.url), {recursive: true});
await cp(new URL("../remotion/out/", import.meta.url), new URL("../dist/remotion/out/", import.meta.url), {
  recursive: true,
  filter: (source) => !source.endsWith(".DS_Store"),
});

await writeFile(new URL("../dist/.nojekyll", import.meta.url), "");
console.log(`GitHub Pages bundle created at ${join(root.pathname, "dist")}`);
