# scraper-poc

Scraper POC to create a MVC application to display input fields with the UI elements for the aswer where the input fields scraped from an external page.

Usage:
- start the application with `npm run start`
- navigate to `localhost:5000` in your browser
- click on the `Scrap!` button
- wait until the page scrapping is finished and the form input fields are automatically filled

Proposals on improvement:
- handling widly used "CV storage pages" like LinkedIn with using their API to login with the current candidate
- dinamic scraping with loading all data from the scraped page and process it finding CV related ones
- handling image like CVs (pdf) with taking picture from it (like puppeteer) and process its data
- etc, etc