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

// Init local server
const port = 5000;
app.listen(port, () => {

});