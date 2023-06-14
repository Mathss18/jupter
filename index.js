import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { ddd, names, surenames } from "./names.js";

let requests_sent = 0;

puppeteer
  .use(StealthPlugin())
  .launch({
    headless: true,
    args: ["--no-sandbox"],
  })
  .then(async (browser) => {
    for (let i = 0; i < 999999999999; i++) {
      const page = await browser.newPage();
      // Enable request interception
      await page.setRequestInterception(true);

      // If the request is for an image, abort the request
      page.on("request", (request) => {
        if (request.resourceType() === "image") request.abort();
        else request.continue();
      });

      await page.goto("https://compretcc.com/");
      await page.waitForTimeout(5000);

      // Generate a random name
      const selectedName = names[Math.floor(Math.random() * names.length)];
      let randomName =
        selectedName.toLowerCase().charAt(0).toUpperCase() +
        selectedName.slice(1).toLowerCase() +
        " " +
        surenames[Math.floor(Math.random() * surenames.length)];

      // Generate a random number
      let randomNumber =
        ddd[Math.floor(Math.random() * ddd.length)] + "9" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");

      let randomArea = Array.from(
        { length: Math.floor(Math.random() * 10) },
        () =>
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
            Math.floor(Math.random() * "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".length)
          ]
      ).join("");

      let randomChars = Array.from(
        { length: Math.floor(Math.random() * 10) },
        () =>
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
            Math.floor(Math.random() * "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".length)
          ]
      ).join("");

      // Fill in the "Nome" field
      await page.$eval("#wpforms-25477-field_0", (el, value) => (el.value = value), randomName);

      // Fill in the "Celular / Whatsapp" field
      await page.$eval("#wpforms-25477-field_3", (el, value) => (el.value = value), randomNumber);

      // Fill in the "E-mail" field
      await page.$eval("#wpforms-25477-field_1", (el, value) => (el.value = value), `${randomChars}@gmail.com`);

      // Fill in the "Curso . Matéria" field
      await page.$eval("#wpforms-25477-field_4", (el, value) => (el.value = value), randomArea);

      // Click the "Enviar" button
      let submitButton = await page.$x("//button[@type='submit' and @name='wpforms[submit]']");
      await submitButton[0].click();
      await page.waitForTimeout(5000);

      console.log("\x1b[32m%s\x1b[0m", "Submitted"); // Green color
      console.log("\x1b[34m%s\x1b[0m", "Requests sent: " + ++requests_sent); // Blue color

      // Close the tab once it is submitted
      await page.close();
    }

    // Close the browser once all tabs are done
    await browser.close();
  });
