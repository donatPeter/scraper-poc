# scraper-poc

Scraper POC to create a MVC application to display input fields with the UI elements for the aswer where the input fields scraped from an external LinkedIn page. 
The app uses:
- express for as a middleware
- selenium-webdriver + headless chrome for page scraping
- express-handlebars for creating a simple, out-of-the-box UI with server side rendering just to make it simple.
- and passport-linkedin-oauth2 for authentication

Usage:
- install required dependencies with `npm install`
- start the application with `npm run start`
- navigate to `localhost:5000` in your browser
- click on the `Scrap!` button
- wait until the page scrapping is finished and the form input fields are automatically filled

Proposals on improvement:
- dinamic scraping with loading all data from the scraped page and process it finding CV related ones
- handling image like CVs (pdf) with taking picture from it (like puppeteer) and process its data
- etc..
