const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const { scrapCV } = require('./utils/scraper');

// Express middleware for routing
const app = express();
require('./config/passport')(passport);

// Handlebars middleware for server side HTML rendering
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })
);

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('*', (req, res) => {
  scrapCV().then((cvMap) => {
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
app.listen(port, () => { });