import { ddd, names, surenames } from "./names.js";

export function generateRandomName() {
  const selectedName = names[Math.floor(Math.random() * names.length)];
  let randomName =
    selectedName.toLowerCase().charAt(0).toUpperCase() +
    selectedName.slice(1).toLowerCase() +
    " " +
    surenames[Math.floor(Math.random() * surenames.length)];

  return randomName;
}

export function generateRandomNumber() {
  return ddd[Math.floor(Math.random() * ddd.length)] + "9" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
}

export function generateRandomArea() {
  return Array.from(
    { length: Math.floor(Math.random() * 10) },
    () =>
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
        Math.floor(Math.random() * "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".length)
      ]
  ).join("");
}
