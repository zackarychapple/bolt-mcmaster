import puppeteer from "puppeteer";
import { PuppeteerAgent } from "@midscene/web/puppeteer";
import * as path from "path";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pathToZephyrExtension = path.join(process.cwd(), 'zephyr_extension.crx');

Promise.resolve(
  (async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox',`--load-extension=${pathToZephyrExtension}`,],
      headless: true,
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

    // 👀 assert by AI
    await mid.aiAssert("The phone number is '(404) 346-7000'");

    await browser.close();
  })()
);
