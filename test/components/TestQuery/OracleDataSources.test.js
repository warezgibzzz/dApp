import { expect } from 'chai';

import OracleDataSources from '../../../src/components/TestQuery/OracleDataSources';

describe('OracleDataSources', () => {

  it('should have all required Data Sources parameters', () => {
    OracleDataSources.forEach((dataSource => {
        expect(dataSource).to.have.property('name');
        expect(dataSource).to.have.property('sampleQueries');
        expect(() => {
          dataSource.descriptionComponent();
          dataSource.queryHint();
          dataSource.isQueryValid('');
        }).to.not.throw();    
    }));
  });

});
