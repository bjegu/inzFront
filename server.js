const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();

var corsOptions = {
  origin: 'https://client-backend.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Serve static files....
app.use(express.static(__dirname + '/dist/inz2'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/inz2/index.html'));
});

app.options('*', cors(corsOptions))

// default Heroku PORT
app.listen(process.env.PORT || 3000);