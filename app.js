const app = require('express')();
const express = require('express');
const nunjucks = require('nunjucks');
const routing = require('./routing');
const path = require('path');

app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use('/assets', express.static(path.join(__dirname, 'app/assets')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend-test')));

var appViews = [
  path.join(__dirname, '/node_modules/nhsuk-frontend-test/'),
  path.join(__dirname, '/app/views/')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

app.get('*', function (req, res) {
  res.redirect('https://beta.nhs.uk/service-manual/');
})

if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Listening for changes at http://localhost:' + app.get('port'));
});

module.exports = app;
