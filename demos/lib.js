import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

export function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(root, relativePath), "utf8"));
}

export function money(amount) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function section(title) {
  console.log(`\n=== ${title} ===`);
}

export function bullet(text) {
  console.log(`- ${text}`);
}

export function findClient(clients, clientId) {
  return clients.clients.find((client) => client.id === clientId);
}

export function findMatter(client, matterId) {
  return client?.matters.find((matter) => matter.id === matterId);
}
