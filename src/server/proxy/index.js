const cors_proxy = require('cors-anywhere');

module.exports = cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
  setHeaders: {
    origin: null
  }
});
