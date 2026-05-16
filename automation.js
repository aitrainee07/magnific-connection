const puppeteer = require("puppeteer");

async function runMagnific(prompt) {
  const browser = await puppeteer.launch({

  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,

  headless: true,

  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
});

  const page = await browser.newPage();

  await page.goto("https://magnific.ai", {
    waitUntil: "domcontentloaded",
  });

  const title = await page.title();

  await page.screenshot({
    path: "magnific-homepage.png",
  });

  await browser.close();

  return {
    success: true,
    title,
    prompt,
  };
}

module.exports = {
  runMagnific,
};
