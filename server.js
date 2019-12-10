const express = require('express');
const path = require('path');
const app = express();
var proxy = require('http-proxy-middleware');

// Serve static files....
app.use(express.static(__dirname + '/dist/inz2'));

app.use(
    '/api',
    proxy({ target: 'https://client-backend.herokuapp.com', changeOrigin: true })
  );

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/inz2/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);