const axios = require('axios');
const request = require('request-promise');
const Binance = require('node-binance-api');
const crypto = require('crypto');
const qs = require('qs');

const API = '9c6c87e51c760146556e016eb0503b4278645668ad9c1fdb1d0f454528ff6545';
const Secret = 'ad24eeb8d7201d4113911eebb9297a4b3026acce5163f1f93413ba374875682d';
const url = 'https://testnet.binancefuture.com';//https://testnet.binance.vision/api
const gen_url = 'https://fapi.binance.com';

const binance = new Binance().options({
  APIKEY: API,
  APISECRET: Secret
});
// TOP TRADERS 매매 비율
// request.get(`${gen_url}/futures/data/topLongShortPositionRatio?symbol=BTCUSDT&period=5m`,(err,res,body)=>{
//     if(err) console.log(err);
//     console.log(JSON.parse(res.body));
// })

// 테이커 매수 / 매도량
// request.get(`${gen_url}/futures/data/takerlongshortRatio?symbol=BTCUSDT&period=5m`,(err,res,body)=>{
//     if(err) console.log(err);
//     // console.log(JSON.parse(res.body));
//     var vol_list = JSON.parse(res.body);
//     for(var i of vol_list) {
//         console.log(i.sellVol);
//         console.log(i.buyVol);
//         var vol_sum = parseFloat(i.sellVol) + parseFloat(i.buyVol);
//         console.log(vol_sum/2);
//     }
// })
// const data = {
//     symbol: 'BNBUSDT',
//     recvWindow: 20000,
//     timestamp: Date.now(),
//   };
  
// //   privateRequest(data, '/api/v3/openOrders', 'GET');
// const buildSign = (data, config) => {
//     return crypto.createHmac('sha256', Secret).update(data).digest('hex');
//   };
//   const binanceConfig = {
//     API_KEY: API,
//     API_SECRET: Secret,
//     HOST_URL: url,
//   };
//   const dataQueryString = qs.stringify(data);
  
// const signature = buildSign(dataQueryString, binanceConfig);
// let order = {
//     symbol: "BNBUSDT",
//     side: "BUY",
//     type: "LIMIT",
//     timestamp: new Date().getUTCMilliseconds(),
//     timeInForce: "GTC",
//     quantity: 500,
//     price: 293,
//     positionSide: "SHORT",
//     reduceOnly: false,
//     stopPrice: 310,        // please ignore when order type is TRAILING_STOP_MARKET
// }
// var options = `?symbol=BNBUSDT&side=BUY&type=LIMIT&timestamp=${new Date().getTime()}&timeInForce=GTC&quantity=500&price=293&positionSide=SHORT&reduceOnly=false&stopPrice=310&&signature=${signature}`;
// // (async () => {
// //     // binance.verbose = true;
// //     // balance = await binance.fetchBalance({'recvWindow': 10000000})
// //     // console.log (balance)
// //     console.log(new Date().getTime());
// // })();

const binanceConfig = {
    API_KEY: API,
    API_SECRET: Secret,
    HOST_URL: url,
};
const data = {
    symbol: "BNBUSDT",
    side: "BUY",
    type: "LIMIT",
    timeInForce: "GTC",
    quantity: 500,
    price: 293,
    // positionSide: "LONG",
    // reduceOnly: false,
    // stopPrice: 310, 
    timestamp: Date.now(),
};
const dataQueryString = qs.stringify(data);
const buildSign = (data, config) => {
    return crypto.createHmac('sha256', config.API_SECRET).update(data).digest('hex');
};
(()=>{
    const signature = buildSign(dataQueryString, binanceConfig);
    request.post(`${url}/fapi/v1/order?`+dataQueryString+`&signature=${signature}`,{headers:{'X-MBX-APIKEY':API}},(err,res,body)=>{
        if(err) console.log(err);
        console.log(JSON.parse(res.body));
    })
})();


//type:

//Type	Additional mandatory parameters
//LIMIT	timeInForce, quantity, price
//MARKET	quantity
//STOP/TAKE_PROFIT	quantity, price, stopPrice
//STOP_MARKET/TAKE_PROFIT_MARKET	stopPrice
//TRAILING_STOP_MARKET	callbackRate