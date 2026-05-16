const puppeteer = require("puppeteer");

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

  await page.goto("https://magnific.ai", {
    waitUntil: "domcontentloaded"
  });

  const title = await page.title();

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
