var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// Create our app
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port, function () {
  console.log('Server is up, listening on port: ', port);
});
