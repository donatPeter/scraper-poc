const express = require('express');
const exphbs = require('express-handlebars');

// Express middleware for routing
const app = express();

// Handlebars middleware for server side HTML rendering
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

app.post('*', (req, res) => {
  scrapCV().then(() => {
    res.render('index', {
      fname: cvMap.fname,
      lname: cvMap.lname,
      phone: cvMap.phone,
      mail: cvMap.mail
    });

  })
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Redirecting any other URL to index
app.get('*', (req, res) => {
  res.redirect('/');
});

// Init local server
const port = 5000;
app.listen(port, () => {

});

// Init selenium-webdriver
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { By, until } = webdriver

// Use headless chrome to not display browser during scraping
const options = new chrome.Options();
options.addArguments('headless');
options.addArguments('disable-gpu')

const path = require('chromedriver').path;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// Scraping the example page
const cvMap = {};
async function scrapCV() {
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
};