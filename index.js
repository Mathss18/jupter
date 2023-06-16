import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { setTimeout as sleep } from "timers/promises";
import { generateRandomArea, generateRandomName, generateRandomNumber } from "./helpers.js";

let requests_sent = 0;
const PROXY_IP = "64.224.17.10";
const PROXY_PORT = "50100";
const PROXY_USER = "theus7";
const PROXY_PASS = "fiIeeApyFq";

async function disableImagesLoad(page) {
  await page.setRequestInterception(true);
  await page.on("request", (request) => {
    if (request.resourceType() === "image") request.abort();
    else request.continue();
  });
}

puppeteer
  .use(StealthPlugin())
  .launch({ headless: true, args: [`--proxy-server=${PROXY_IP}:${PROXY_PORT}`, "--no-sandbox"] })
  .then(async (browser) => {
    for (let i = 0; i < 999999999999; i++) {
      const page = await browser.newPage();
      // Enable request interception
      await disableImagesLoad(page);

      await page.authenticate({
        username: PROXY_USER,
        password: PROXY_PASS,
      });

      await page.goto("https://compretcc.com/", { timeout: 999999999 });
      await page.waitForTimeout(1000);

      // Generate a random name
      const randomName = generateRandomName();

      // Generate a random number
      const randomNumber = generateRandomNumber();

      // Generate a random area
      const randomArea = generateRandomArea();

      await page.evaluate(() => {
        window.scrollBy(500, window.innerHeight);
      });
      await page.mouse.move(100, 100);
      await page.keyboard.press("Shift");

      await page.waitForSelector(".iti__selected-flag", { timeout: 999999999 });
      await page.click(".iti__selected-flag");

      // Wait for the dropdown options to be visible
      await page.waitForSelector(".iti__country-list");

      // Select the country (In this case, Brazil)
      await page.click("#iti-0__item-br");

      await sleep(100);

      await page.$eval("#wpforms-25477-field_0", (el, value) => (el.value = value), randomName);
      await page.$eval("#wpforms-25477-field_3", (el, value) => (el.value = value), randomNumber);
      // await page.$eval("#wpforms-25477-field_1", (el, value) => (el.value = value), `${randomArea}@gmail.com`);
      // await page.$eval("#wpforms-25477-field_4", (el, value) => (el.value = value), randomArea);

      // Click the "Enviar" button
      let submitButton = await page.$x("//button[@type='submit' and @name='wpforms[submit]']");
      await submitButton[0].click();
      await page.waitForTimeout(5000);
      await page.screenshot({ path: "image.png", fullPage: true });

      console.log(`===============================`);
      console.log(`Name: ${randomName}`);
      console.log(`Number: ${randomNumber}`);
      console.log("\x1b[32m%s\x1b[0m", "Submitted"); // Green color
      console.log("\x1b[34m%s\x1b[0m", "Requests sent: " + ++requests_sent); // Blue color

      // sleep(10000);

      // Close the tab once it is submitted
      await page.close();
    }

    // Close the browser once all tabs are done
    await browser.close();
  });
