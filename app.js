const express = require('express');
const exphbs = require('express-handlebars');
const { scrapCV } = require('./utils/scraper');

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
app.listen(port, () => { });