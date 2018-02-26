// Init selenium-webdriver
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { By, until } = webdriver;
const path = require('chromedriver').path;

// Use headless chrome to not display browser during scraping
const options = new chrome.Options();
options.addArguments('headless');
options.addArguments('disable-gpu')
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

module.exports = {
  scrapCV: async function (req, res, next) {
    // Scraping the example page
    const cvMap = {};
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .withCapabilities(webdriver.Capabilities.chrome())
      .setChromeOptions(options)
      .build();
    try {
      await driver.get('https://www.profession.hu/oneletrajz/palyakezdo-marketinges-angol-cv');
      await driver.findElement(By.css('.info > h2')).getText().then(res => {
        resArr = res.split(' ');
        cvMap.fname = resArr[0];
        cvMap.lname = resArr[1]
      })
      await driver.findElement(By.css('.info')).getAttribute('innerText').then(res => {
        cvMap.phone = res.slice(res.indexOf('Phone'), res.indexOf('E-mail')).replace('Phone: ', '').replace(/ /g, '');
        cvMap.mail = res.slice(res.indexOf('E-mail')).replace('E-mail: ', '');
      })
    } finally {
      await driver.quit();
    }
    return cvMap;
  }
}


