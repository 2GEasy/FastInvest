const WebSocket = require('ws');
const Binance = require('node-binance-api');
const API = 'dE2HQt9oqRWASLC6lICRMy2yDqcZb7Tnkv2aX9HTve5UEa7lc2gaCreidXWtcIml';
const SECRET = 'J2mQOxDW8LOLIWXEznorHdwtduVDQvJ0LNGhRI6pPBxBKkaWxAUPS3JpV5quN0Gj';
const binance = new Binance().options({
  APIKEY: API,
  APISECRET: SECRET
});
(async()=>{
    
    // 선물 가격
    // console.info( await binance.futuresPrices() );
    // 선물 계정 잔액 및 포지션
    // console.info( await binance.futuresAccount() );
    // 선물 잔액
    console.info( JSON.parse(JSON.stringify(await binance.futuresBalance())).filter(item=> {if(item.asset=="USDT") console.info(item)}) );
    // 선물 지정가 매수
    // console.info( await binance.futuresBuy( 'BTCUSDT', 0.1, 8222 ) );
    // 선물 지정가 매도
    // console.info( await binance.futuresSell( 'BTCUSDT', 0.5, 11111 ) );
    // 선물 시장 매수
    // console.info( await binance.futuresMarketBuy( 'BNBUSDT', 5 ) );
    // 선물 시장 매도
    // console.info( await binance.futuresMarketSell( 'TRXUSDT', 1 ) );
    // 선물 시장 주문 : newOrderRespType을 사용하여 매도 가격 확인
    // console.info( await binance.futuresMarketBuy( 'BNBUSDT', amount, { newOrderRespType: 'RESULT' } ) );
    // 선물 reduceOnly 주문 예
    // if ( side == 'LONG' ) order = await binance.futuresMarketSell( obj.symbol, amount, {reduceOnly: true} )
    // else order = await binance.futuresMarketBuy( obj.symbol, amount, {reduceOnly: true} )
    // 선물 포지션
    // console.info( await binance.futuresPositionRisk() );
    // View Example
    // let position_data = await binance.futuresPositionRisk(), markets = Object.keys( position_data );
    // for ( let market of markets ) {
    //   let obj = position_data[market], size = Number( obj.positionAmt );
    //   if ( size == 0 ) continue;
    //   console.info( `${leverage}x\t${market}\t${obj.unRealizedProfit}` );
    //   //console.info( obj ); //positionAmt entryPrice markPrice unRealizedProfit liquidationPrice leverage marginType isolatedMargin isAutoAddMargin maxNotionalValue
    // }
    // 레버리지 조정 (1-125x)
    // console.info( await binance.futuresLeverage( 'ETHUSDT', 50 ) );
    // 마진 격리 교차 조정 (ISOLATED, CROSSED)
    // console.info( await binance.futuresMarginType( 'BTCUSDT', 'ISOLATED' ) );
    // 마진 Position 조정
    // // Type: 1: Add postion margin，2: Reduce postion margin
    // console.info( await binance.futuresPositionMargin( "TRXUSDT", amount, type ) );
    // console.info( await binance.futuresTime() );

    // console.info( await binance.futuresExchangeInfo() );
    // console.info( await binance.futuresCandles( "TRXUSDT", "1m" ) );
    // // console.info("매수 호가: ", (await binance.futuresDepth( "BNBUSDT" )).bids );
    // console.info("롱: ", (await binance.futuresDepth( "BNBUSDT" )).bids[1][0] );
    // // console.info("매도 호가: ", (await binance.futuresDepth( "BNBUSDT" )).asks );
    // console.info("숏: ", (await binance.futuresDepth( "BNBUSDT" )).asks[1][0] );
    // console.info( await binance.futuresQuote() );
    // console.info( await binance.futuresQuote( "BCHUSDT" ) );
    // console.info( await binance.futuresDaily() );
    // console.info( await binance.futuresOpenInterest( "BTCUSDT" ) );
    // console.info( await binance.futuresMarkPrice() );
    // console.info( await binance.futuresMarkPrice( "ETHUSDT" ) );
    // console.info( await binance.futuresTrades('BTCUSDT'));
    // console.info( await binance.futuresAggTrades( "BTCUSDT" ) );
    // 선물청산주문
    // console.info( await binance.futuresLiquidationOrders() );
    // console.info( await binance.futuresFundingRate() );
    // 선물 거래 내역?
    // console.info( await binance.futuresHistoricalTrades( "XMRUSDT" ) );
    // 선물 레버리지 브라켓 = 레버리지 설정 시 범위 ex) BNB 맥스 75배, 도지 맥스 50배
    // console.info( JSON.stringify(await binance.futuresLeverageBracket( "DOGEUSDT" )) );
    // console.info( await binance.futuresIncome() );
    // console.info( await binance.futuresCancelAll( "BTCUSDT" ) );
    // console.info( await binance.futuresCancel( "BTCUSDT", {orderId: "1025137386"} ) );
    // console.info( await binance.futuresCountdownCancelAll( "BTCUSDT", 45000 ) );
    // console.info( await binance.futuresOrderStatus( "BTCUSDT", {orderId: "1025137386"} ) );
    // console.info( await binance.futuresOpenOrders() );
    // console.info( await binance.futuresOpenOrders( "BTCUSDT" ) );
    // console.info( await binance.futuresAllOrders() );
    // console.info( await binance.futuresAllOrders( "BTCUSDT" ) );
    // 거래 내역
    // console.info( await binance.futuresUserTrades() );
    // console.info( await binance.futuresGetDataStream() );
    // console.info( await binance.futuresPositionMarginHistory() );
    // console.info( await binance.promiseRequest( 'v1/time' ) );
    // // Batch orders, remaining WebSocket streams, and better documentation will be come later
    // 선물 내역 대량 데이터 다운로드 API
    // 다운로드 ID 받기
    // console.info( await binance.futuresHistDataId(
    //   "BTCUSDT", {
    //     startTime: new Date().getTime() - 24 * 60 * 60 * 1000,
    //     endTime: new Date().getTime(),
    //     dataType: 'T_TRADE'
    //   } )
    // )
    // 다운로드 링크 받기
    // console.info( await binance.futuresDownloadLink(7343)
    // 선물 WebSocket 스트림
    // 모든 심볼에 대한 선물 miniTicker 스트림
    // binance.futuresMiniTickerStream( miniTicker => {
    //     console.info( miniTicker );
    // } );
    // 심볼에 대한 선물 miniTicker 스트림
    // binance.futuresMiniTickerStream( 'BNBUSDT', console.log );
    // 모든 심볼에 대한 선물 bookTicker 스트림
    // binance.futuresBookTickerStream( console.log );
    // 기호에 대한 선물 bookTicker 스트림 호가창
    // binance.futuresBookTickerStream( 'BNBUSDT', console.log );

    // Futures prevDay ticker stream for all symbols
    // binance.futuresTickerStream( console.log );
    // Futures prevDay ticker stream for a symbol
    // binance.futuresTickerStream( 'BNBUSDT', console.log );
    // Futures mark price stream for all symbols
    // binance.futuresMarkPriceStream( console.log );
    // 선물 표시 가격 흐름
    // binance.futuresMarkPriceStream( 'BNBUSDT', console.log );
    // 심볼에 대한 선물 거래 흐름 총계
    // binance.futuresAggTradeStream( 'BTCUSDT', console.log );
    // Futures complete chart cache
    // binance.futuresChart( 'BNBUSDT', '1m', console.log );
    // Futures Liquidation Stream for all symbols
    // binance.futuresLiquidationStream( console.log );
    // Futures Liquidation Stream for a symbol
    // binance.futuresLiquidationStream( 'BTCUSDT', console.log );
    // Connect to a custom endpoint. Easier shortcut functions will come later
    // binance.futuresSubscribe( 'btcusdt@kline_4h', console.log );
    // Terminate an existing socket
    // binance.futuresTerminate( 'btcusdt@kline_4h' );
    // Return active sockets and subscriptions
    // console.log( binance.futuresSubscriptions() );
    // binance.depth ( "BNBUSDT" ,  ( error ,  depth ,  symbol )  =>  { 
    //   console.info ( symbol + "market depth" ,  depth ) ; 
    // } ) ;
    // let socket = new WebSocket(" wss://stream.binance.com:9443/ws/bnbusdt@depth10@100ms");
    // socket.onmessage = function(event){
    // 	// console.log(event.data);
    //   var orders = JSON.parse(event.data);
    //   // console.log(orders);
      
    //   console.log("R롱: ",(orders.bids[0][0]));
    //   console.log("R숏: ",(orders.asks[0][0]));
    //   socket.close();
    //   // console.log(event.data.asks);
    // }
    // // console.info("매수 호가: ", (await binance.futuresDepth( "BNBUSDT" )).bids );
    // console.info("롱: ", (await binance.futuresDepth( "BNBUSDT" )).bids[1][0] );
    // // console.info("매도 호가: ", (await binance.futuresDepth( "BNBUSDT" )).asks );
    // console.info("숏: ", (await binance.futuresDepth( "BNBUSDT" )).asks[1][0] );
    // STOP LOSS 주문하기
    // let type = "STOP_LOSS";
    // let quantity = 1;
    // let price = 0.069;
    // let stopPrice = 0.068;
    // binance.sell("ETHBTC", quantity, price, {stopPrice: stopPrice, type: type});
    // 미결 주문 취소
    // binance.cancel("ETHBTC", orderid, (error, response, symbol) => {
    //     console.info(symbol+" cancel response:", response);
    //   });
    //모든 미결 주문 취소
    // console.info( await binance.cancelAll("XMRBTC") );
    // 특정 코인에 대한 미결 주문 가져오기
    // binance.openOrders("ETHBTC", (error, openOrders, symbol) => {
    //     console.info("openOrders("+symbol+")", openOrders);
    //   });
    // 모든 미결 주문 목록 가져 오기
    // binance.openOrders(false, (error, openOrders) => {
    //     console.info("openOrders()", openOrders);
    //   });
    
    //거래내역 
    // binance.trades('BTCUSDT', (error, trades, symbol) => {
    //     console.info(symbol+" trade history", trades);
    // });
    /*
     { id: 9575,
        orderId: 47884,
        price: '0.00003701',
        qty: '735.00000000',
        commission: '0.03394257',
        commissionAsset: 'BNB',
        time: 1507062502528,
        isBuyer: true,
        isMaker: true,
        isBestMatch: true } } ]
        */
})();
