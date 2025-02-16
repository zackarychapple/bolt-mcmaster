import puppeteer from "puppeteer";
import {PuppeteerAgent} from "@midscene/web/puppeteer";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const remote = process.env.REMOTE;
const remoteUrl = process.env.REMOTE_URL;

Promise.resolve(
  (async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    let page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });
    console.log('url:' + process.env.PAGE_URL)
    await page.goto(process.env.PAGE_URL);
    await sleep(5000);

    // 👀 init Midscene agent
    let mid = new PuppeteerAgent(page);

    // 👀 assert by AI
    await mid.aiAssert("The phone number is '(404) 346-7000'");

    await mid.aiAssert("the text on the screen should contain \"This is a button from Vite remote.\"")

    console.log("Production is broken")

    page = await browser.newPage();
    await page.goto("https://t-production-vite-mcmaster-host-bolt-mcmaster-zackary-92c83f-ze.zephyrcloud.app/");
    await sleep(5000);

    mid = new PuppeteerAgent(page);

    await mid.aiAssert("the text on the screen should not contain \"Yep Really, not yet\"")
    // Updating session storage for the remote to have the "next" tag
    await page.evaluate((remote, url) => {
        sessionStorage.setItem(remote, url);
      }, remote, remoteUrl
    );

    await page.reload();
    await sleep(5000);

    const storedValueWorked = await page.evaluate((remote) => sessionStorage.getItem(remote), remote);
    console.log('Stored value:', storedValueWorked);

    mid = new PuppeteerAgent(page);

    await mid.aiAssert("the text on the screen should contain \"This is a button from Vite remote. Yep Really, not yet\"")
    await browser.close();
  })()
);
