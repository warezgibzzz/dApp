import Rx from 'rxjs/Rx';

const ExchangeSources = [
  {
    key: 'BIN',
    name: 'Binance',
    genOracleQuery(symbol) {
      return `json(https://api.binance.com/api/v3/ticker/price?symbol=${symbol}).price`;
    },
    fetchList(quotes) {
      const info = Rx.Observable.ajax({
        url: 'https://api.marketprotocol.io/proxy/binance/api/v1/exchangeInfo',
        method: 'GET',
        responseType: 'json'
      }).map(data =>
        data.response.symbols.filter(
          symbol => quotes.indexOf(symbol.quoteAsset) >= 0
        )
      );

      const price = Rx.Observable.ajax({
        url: 'https://api.marketprotocol.io/proxy/binance/api/v3/ticker/price',
        method: 'GET',
        responseType: 'json'
      }).map(data => data.response);

      return Rx.Observable.zip(info, price, function(infoItem, priceItem) {
        const prices = {};
        const symbols = [];
        priceItem.forEach(e => {
          prices[e.symbol] = e.price;
        });
        infoItem.forEach(e => {
          symbols.push({
            symbol: e.symbol,
            price: prices[e.symbol],
            priceDecimalPlaces: e.baseAssetPrecision,
            quoteAsset: e.quoteAsset
          });
        });
        return symbols;
      });
    }
  },
  {
    key: 'KRA',
    name: 'Kraken',
    genOracleQuery(symbol) {
      return `json(https://api.kraken.com/0/public/Ticker?pair=${symbol}).result.XETHZUSD.p.1`;
    },
    fetchList() {
      return Rx.Observable.empty();
    }
  }
];

export function getExchangeObj(source) {
  return ExchangeSources.filter(sourceObj => source === sourceObj.key)[0];
}

export default ExchangeSources;
