const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function runMagnific(prompt) {

  const browser = await puppeteer.launch({

    executablePath: "/usr/bin/chromium",

    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36"
  );

  await page.goto("https://magnific.ai", {
    waitUntil: "networkidle2",
    timeout: 60000
  });

  const title = await page.title();

  await page.screenshot({
    path: "magnific.png"
  });

  await browser.close();

  return {
    success: true,
    title,
    prompt
  };
}

module.exports = {
  runMagnific
};
