import puppeteer from "puppeteer";
import { EBird } from "./ebird";

async function delay(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {
  console.log(process.argv[2]);

  // get the browser and page object (puppeteer stuff)
  // -- browser is only used to get the page
  // -- page is used to interact with the page, select elements, etc.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await EBird.goToEBirdHomePage(page);
  await delay(1000);
  await EBird.logInToEBird(page);
  await delay(1000);
  await EBird.goToMyEBirdPage(page);
  await delay(1000);
  await EBird.goToMyCheckLists(page);
  await delay(1000);
  const hrefs = await EBird.getMyListLinks(page);
  console.log(hrefs);
  for (const href of hrefs) {
    console.log(href);
    await EBird.goToMyLinkPage(page, href);
    await delay(1000);
    const title = await EBird.getMyListTitle(page);
    console.log(title);
    await delay(1000);
  }

  await browser.close();
}

main();
