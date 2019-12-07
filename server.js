const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/inz2'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/inz2/index.html'));
});

app.options('*', cors())

// default Heroku PORT
app.listen(process.env.PORT || 3000);