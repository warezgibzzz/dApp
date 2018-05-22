import ExchangeSources from '../../../src/components/DeployContract/ExchangeSources';

describe('ExchangeSources', () => {
  it('fetchList and genOracleQuery without crashing', () => {
    ExchangeSources.map(exchange => {
      exchange.fetchList();
      exchange.genOracleQuery('BNBETH');
    });
  });
});
