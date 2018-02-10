# scraper-poc

Scraper POC to create a MVC application to display input fields with the UI elements for the aswer where the input fields scraped from an external page (`https://www.profession.hu/oneletrajz/palyakezdo-marketinges-angol-cv`). The app uses express for as a middleware, selenium-webdriver + headless chrome for page scraping and express-handlebars for creating a simple, out-of-the-box UI with server side rendering just to make it simple.

Usage:
- install required dependencies with `npm install`
- start the application with `npm run start`
- navigate to `localhost:5000` in your browser
- click on the `Scrap!` button
- wait until the page scrapping is finished and the form input fields are automatically filled

Proposals on improvement:
- handling widly used "CV storage pages" like LinkedIn with using their API to login with the current candidate
- dinamic scraping with loading all data from the scraped page and process it finding CV related ones
- handling image like CVs (pdf) with taking picture from it (like puppeteer) and process its data
- etc, etc
