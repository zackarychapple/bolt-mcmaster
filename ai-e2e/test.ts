import puppeteer from "puppeteer";
import { PuppeteerAgent } from "@midscene/web/puppeteer";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
Promise.resolve(
  (async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });
    console.log('url:' + process.env.PAGE_URL)
    await page.goto(process.env.PAGE_URL);
    await sleep(5000);

    // 👀 init Midscene agent
    const mid = new PuppeteerAgent(page);

    // 👀 understand the page content, find the items
    const items = await mid.aiQuery("how many items are on the current category");

    console.log("quantity of items on page", items);

    // 👀 assert by AI
    await mid.aiAssert("There is a category filter on the left");

    await browser.close();
  })()
);
