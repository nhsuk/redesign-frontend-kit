const app = require('express')();
const express = require('express');
const nunjucks = require('nunjucks');
const routing = require('./app/config/routing');
const path = require('path');

app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use('/assets', express.static(path.join(__dirname, 'app/assets')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, 'node_modules/nhsuk-frontend-test')))

nunjucks.configure('app/views', {
  autoescape: true,
  express: app
});

app.get(/^([^.]+)$/, function (req, res, next) {
  routing.matchRoutes(req, res, next)
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
