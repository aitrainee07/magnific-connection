const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function runMagnific(prompt) {

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://magnific.ai", {
    waitUntil: "networkidle2"
  });

  await page.screenshot({
    path: "magnific-home.png",
    fullPage: true
  });

  const title = await page.title();

  await browser.close();

  return {
    title,
    prompt,
    screenshot: "/files/magnific-home.png"
  };
}

module.exports = { runMagnific };
