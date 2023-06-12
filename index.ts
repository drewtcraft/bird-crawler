import puppeteer from "puppeteer";
import {EBird} from "./ebird";

async function delay(time: number){
await new Promise(resolve => setTimeout(resolve, time))
}

async function main() {
  console.log(process.argv[2]);

  // get the browser and page object (puppeteer stuff)
  // -- browser is only used to get the page
  // -- page is used to interact with the page, select elements, etc.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await EBird.goToEBirdHomePage(page);
  await delay(10000)
  await EBird.logInToEBird(page);
  await delay(10000)
  await EBird.goToMyEBirdPage(page);
  await delay(10000)

  await browser.close();
}

main();
