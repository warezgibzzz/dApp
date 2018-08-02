import ExchangeSources from '../../../src/components/DeployContract/ExchangeSources';
import fs from 'fs';
import { expect } from 'chai';
import sinon from 'sinon';

describe('ExchangeSources', () => {
  it('fetchList and genOracleQuery without crashing', () => {
    ExchangeSources.map(exchange => {
      exchange.fetchList();
      exchange.genOracleQuery('BNBETH');
    });
  });

  describe('api methods', () => {
    let server;
    let binance;
    let bitfinex;
    let kraken;
    let symbol;

    const dataPata = '/fakedata/';
    let binanceExchangeInfo;
    let binanceTickerPrice;
    let bitfinexSymbolsDetails;
    let bitfinexPubTicker;

    beforeAll(() => {
      server = sinon.createFakeServer();
      server.respondImmediately = true;
      binanceExchangeInfo = fs
        .readFileSync(__dirname + dataPata + 'binanceExchangeInfo.json')
        .toString();
      binanceTickerPrice = fs
        .readFileSync(__dirname + dataPata + 'binanceTickerPrice.json')
        .toString();
      bitfinexSymbolsDetails = fs
        .readFileSync(__dirname + dataPata + 'bitfinexSymbolsDetails.json')
        .toString();
      bitfinexPubTicker = fs
        .readFileSync(__dirname + dataPata + 'bitfinexPubTicker.json')
        .toString();
      server.respondWith(
        'GET',
        'https://api.marketprotocol.io/proxy/binance/api/v1/exchangeInfo',
        [200, { 'Content-Type': 'application/json' }, binanceExchangeInfo]
      );
      server.respondWith(
        'GET',
        'https://api.marketprotocol.io/proxy/binance/api/v3/ticker/price',
        [200, { 'Content-Type': 'application/json' }, binanceTickerPrice]
      );
      server.respondWith(
        'GET',
        'https://api.marketprotocol.io/proxy/bitfinex/v1/symbols_details',
        [200, { 'Content-Type': 'application/json' }, bitfinexSymbolsDetails]
      );
      server.respondWith(
        'GET',
        'https://api.marketprotocol.io/proxy/bitfinex/v1/pubticker/ETHUSD',
        [200, { 'Content-Type': 'application/json' }, bitfinexPubTicker]
      );

      binance = ExchangeSources.find(e => e.key === 'BIN');
      bitfinex = ExchangeSources.find(e => e.key === 'BIT');
      kraken = ExchangeSources.find(e => e.key === 'KRA');
      symbol = {
        symbol: 'ETH',
        priceDecimalPlace: 1,
        quoteAsset: 'USD'
      };
    });

    afterAll(() => {
      server.restore();
    });

    it('Returns binance oracale query string', () => {
      const query = binance.genOracleQuery(symbol);
      expect(query.substring(0, 56)).to.equal(
        'json(https://api.binance.com/api/v3/ticker/price?symbol='
      );
    });

    it('Returns bitfinex oracale query string', () => {
      const query = bitfinex.genOracleQuery(symbol);
      expect(query.substring(0, 43)).to.equal(
        'json(https://api.bitfinex.com/v1/pubticker/'
      );
    });

    it('Returns kraken oracale query string', () => {
      const query = kraken.genOracleQuery(symbol);
      expect(query.substring(0, 49)).to.equal(
        'json(https://api.kraken.com/0/public/Ticker?pair='
      );
    });

    it('GETs and handles data from binanace', async () => {
      const results = await binance.fetchList('ETH').toPromise();

      expect(results.length > 0).to.equal(true);
      results.forEach(element => {
        expect(element.hasOwnProperty('symbol'));
        expect(element.hasOwnProperty('price'));
        expect(element.hasOwnProperty('priceDecimalPlaces'));
        expect(element.hasOwnProperty('quoteAsset'));
      });
    });

    it('GETs and handles data from bitfinex', async () => {
      const results = await bitfinex.fetchList('ETH').toPromise();

      expect(results.length > 0).to.equal(true);
      results.forEach(element => {
        expect(element.hasOwnProperty('symbol'));
        expect(element.hasOwnProperty('price'));
        expect(element.hasOwnProperty('priceDecimalPlaces'));
        expect(element.hasOwnProperty('quoteAsset'));
      });
    });

    it('GETs and handles price data from bitfinex', async () => {
      const symbol = 'ETHUSD';
      const result = await bitfinex.getPrice(symbol).toPromise();
      expect(typeof parseFloat(result)).to.equal('number');
    });
  });
});
