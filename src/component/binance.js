const WebSocket = require('ws');
const Binance = require('node-binance-api');
const API = 'dE2HQt9oqRWASLC6lICRMy2yDqcZb7Tnkv2aX9HTve5UEa7lc2gaCreidXWtcIml';
const SECRET = 'J2mQOxDW8LOLIWXEznorHdwtduVDQvJ0LNGhRI6pPBxBKkaWxAUPS3JpV5quN0Gj';
const binance = new Binance().options({
  APIKEY: API,
  APISECRET: SECRET
});
export default binance;
