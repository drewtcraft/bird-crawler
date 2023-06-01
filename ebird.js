
const E_BIRD_LANDING = "https://ebird.org/home";

const E_BIRD_USERNAME = "drewtcraft";
const E_BIRD_PASSWORD = "MyD0GisCOOL!";

module.exports = class EBird {

  static async goToEBirdHomePage(page) {
    // this pattern will be used throughout; we use Promise.all
    // to navigate or click somewhere, and waitForNavigation to
    // ensure the browser has loaded the next page
    await Promise.all([
        page.goto(E_BIRD_LANDING), // go to eBird landing page
        page.waitForNavigation(),
    ]);
  }

  // class that is basically just a namespace for static methods
  // relating to eBird login
  static async logInToEBird(page) {
      // the HTML selector that gets the sign up button
      const signUpSelector = ".HeaderEbird-menu-tools ul li:nth-child(2)";
      await page.waitForSelector(signUpSelector);
      await page.click(signUpSelector);

      // select the username input and type in the username
      const usernameInputSelector = "#input-user-name";
      await page.waitForSelector(usernameInputSelector);
      await page.type(usernameInputSelector, E_BIRD_USERNAME);

      // select the password input and type in the password
      const passwordInputSelector = "#input-password";
      await page.waitForSelector(passwordInputSelector);
      await page.type(passwordInputSelector, E_BIRD_PASSWORD);

      // submit the login form
      await Promise.all([
          page.click("#form-submit"),
          page.waitForNavigation(),
      ]);
  }

  static async goToMyEBirdPage(page) {
      const selector = "a.HeaderEbird-link[href='/myebird']";
      await page.waitForSelector(selector);
      await Promise.all([
          page.click(selector),
          page.waitForNavigation(),
      ]);
  }
}
