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

// Scraping an example page
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
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(webdriver.Capabilities.chrome())
  .setChromeOptions(options)
  .build();