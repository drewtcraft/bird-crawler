const puppeteer = require("puppeteer");
const EBird = require("./ebird");

async function main() {
  console.log(process.argv[2]);

  // get the browser and page object (puppeteer stuff)
  // -- browser is only used to get the page
  // -- page is used to interact with the page, select elements, etc.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await EBird.goToEBirdHomePage(page);
  await EBird.logInToEBird(page);
  await EBird.goToMyEBirdPage(page);

  await browser.close();
}

main();
