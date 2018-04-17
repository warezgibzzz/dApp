import { expect } from 'chai';
import sinon from 'sinon';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

import { QueryTest } from '../mocks/contracts';
import { testQuery } from '../../src/actions/testQuery';

function validQuerySpecs() {
  return {
    oracleDataSource: 'WolframAlpha',
    oracleQuery: '2+2',
  };
}

function mockedCoinbaseWeb3(callbackError = null, coinbaseAddress = '0x123456') {
  const fakeProvider = new FakeProvider();
  const web3 = new Web3(fakeProvider);
  web3.eth.getCoinbase = (callback) => { callback(callbackError, coinbaseAddress); };
  return web3;
}

describe('TestQueryAction', () => {

  let contractParams;
  let queryParams;
  let dispatchSpy;

  function runTestQueryAction() {
    const testQueryAction = testQuery(queryParams, contractParams);
    return testQueryAction(dispatchSpy);
  }

  beforeEach(() => {
    contractParams = { QueryTest: QueryTest() };
    queryParams = { querySpecs: validQuerySpecs(), web3: mockedCoinbaseWeb3() };
    dispatchSpy = sinon.spy();
  });

  it('should dispatch pending with query tx id and successful with query result a query is ', function() {
    const expectedResult = '4';
    const expctedQueryTxId = '0x00000005';
    const stubQueryResult = {
      tx: expctedQueryTxId,
      logs: [{ 
        event: 'QueryScheduled', // query emits a Query Scheduled event
        args: { queryIDScheduled: '2' }
      }]
    };
    Object.assign(contractParams.QueryTest.instance, {
      testOracleQuery: () => stubQueryResult,
      QueryCompleted: () => ({ watch(callback) { callback(null, { args: { queryIDCompleted: '2' } }); } }),
      getQueryResults: { call: () => (Promise.resolve(expectedResult))}
    });

    return runTestQueryAction().then(() => {
      expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_TRANSACTION_PENDING');
      expect(dispatchSpy.args[1][0].payload).to.equals(expctedQueryTxId);
      expect(dispatchSpy.args[2][0].type).to.equals('TEST_QUERY_FULFILLED');
      expect(dispatchSpy.args[2][0].payload).to.equals(expectedResult);
    });
  });

  it('should dispatch error if query scheduled even was emitted', () => {
    const stubQueryResult = {
      tx: '',
      logs: [] // no events emitted with testOracleQuery
    };
    Object.assign(contractParams.QueryTest.instance, {
      testOracleQuery: () => stubQueryResult
    });

    return runTestQueryAction().catch(() => {
      // third time query rejected.
      expect(dispatchSpy.args[2][0].type).to.equals('TEST_QUERY_REJECTED');
    });
  });
  
  it('should dispatch error if getQueryResult call fails', () => {
    const errorMsg = 'Could not connect to Query Test';
    const stubQueryResult = {
      tx: '0x00000005',
      logs: [{ 
        event: 'QueryScheduled', // query emits a Query Scheduled event
        args: { queryIDScheduled: '2' }
      }]
    };
    Object.assign(contractParams.QueryTest.instance, {
      testOracleQuery: () => stubQueryResult,
      QueryCompleted: () => ({ watch(callback) { callback(null, { args: { queryIDCompleted: '2' } }); } }),
      getQueryResults: { call: () => (Promise.reject(Error(errorMsg)))} // getQueryResults fails
    });

    return runTestQueryAction().catch(() => {
      expect(dispatchSpy.args[2][0].type).to.equals('TEST_QUERY_REJECTED');
      expect(dispatchSpy.args[2][0].payload).to.equals(errorMsg);
    });
  });

  it('should dispatch error if QueryTest contract is not deployed', () => {
    const errorMsg = 'QueryTest not deployed yet';
    contractParams.QueryTest.deployed = () => (Promise.reject(Error(errorMsg)));

    return runTestQueryAction().catch(() => {
      expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_REJECTED');
      expect(dispatchSpy.args[1][0].payload).to.equals(errorMsg);
    });
  });

  it('should dispatch error if testOracleQuery() fails', () => {
    const errorMsg = 'Unable to reach contract';
    Object.assign(contractParams.QueryTest.instance, {
      testOracleQuery: () => { throw new Error(errorMsg); }
    });

    return runTestQueryAction().catch(() => {
      expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_REJECTED');
      expect(dispatchSpy.args[1][0].payload).to.equals(errorMsg);
    });
  });

  it('should dispatch error if getCoinbase return error', () => {
    queryParams.web3 = mockedCoinbaseWeb3(Error("Could not fetch coinbase"));

    return runTestQueryAction().catch(() => {
      expect(dispatchSpy).to.have.property('callCount', 2);
      expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_REJECTED');
    });
  });

  it('should dispatch loading and then error if web3 is undefined', () => {
    queryParams.web3 = null;

    return runTestQueryAction().catch(() => {
      expect(dispatchSpy).to.have.property('callCount', 2);
      expect(dispatchSpy.args[0][0].type).to.equals('TEST_QUERY_PENDING');
      expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_REJECTED');
    });
  });

});