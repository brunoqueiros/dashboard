const proxyServer = require('./proxy');
const express = require('express');
const app = express();

app.all('/proxy/*', (req, res) => {
  req.url = req.url.replace('/proxy/', '/');
  proxyServer.emit('request', req, res);
});

app.listen(8080, () => console.log('Server running on 8080!'))
