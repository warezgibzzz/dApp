import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Steps } from 'antd';
import { expect } from 'chai';
import sinon from 'sinon';

import TestQueryForm from '../../../src/components/TestQuery/TestQueryForm';
import {
  AboutOraclesStep,
  QueryResultStep,
  SelectDataSourceStep,
  SetQueryStep
} from '../../../src/components/TestQuery/Steps';

describe('TestQueryForm', () => {
  let testQueryForm;
  let onTestQuerySpy;
  beforeEach(() => {
    onTestQuerySpy = sinon.spy();
    testQueryForm = shallow(<TestQueryForm onTestQuery={onTestQuerySpy}/>);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestQueryForm />, div);
  });

  it('should render 4 steps', () => {
    expect(testQueryForm.find(Steps.Step)).to.have.length(4);
  });

  it('should render AboutOracleStep by default', () => {
    expect(testQueryForm.find(AboutOraclesStep)).to.have.length(1);
  });

  it('should render SelectDataSourceStep as second step', () => {
    testQueryForm.setState({ step: 1 });
    expect(testQueryForm.find(SelectDataSourceStep)).to.have.length(1);
  });

  it('should change data source with SelectDataSourceStep.onChange', () => {
    const dataSource = 'URL';
    testQueryForm.setState({ step: 1 });
    testQueryForm.find(SelectDataSourceStep).simulate('change', dataSource);
    expect(testQueryForm.state('oracleDataSource')).to.equal(dataSource);
  });

  it('should render SetQueryStep as third step', () => {
    testQueryForm.setState({ step: 2 });
    expect(testQueryForm.find(SetQueryStep)).to.have.length(1);
  });

  it('should change query with SetQueryStep.onChange', () => {
    const query = 'https://some-query-url.com';
    testQueryForm.setState({ step: 2 });
    testQueryForm.find(SetQueryStep).simulate('change', query);
    expect(testQueryForm.state('oracleQuery')).to.equal(query);
  });

  it('should call onTestQuery when query is submitted', () => {
    testQueryForm.setState({ step: 2 });
    testQueryForm.find(SetQueryStep).simulate('submit');

    expect(onTestQuerySpy).to.have.property('callCount', 1);
  });

  it('should render QueryResultStep as fourth step', () => {
    testQueryForm.setState({ step: 3 });
    expect(testQueryForm.find(QueryResultStep)).to.have.length(1);
  });

  it('should navigate to /contract/deploy onCreateContractClicked', () => {
    const navSpy = sinon.spy();
    testQueryForm.setState({ 
      step: 3,
      oracleDataSource: 'WolframAlpha',
      oracleQuery: '2+2'
    });
    testQueryForm.setProps({
      history: { push: navSpy }
    });
    testQueryForm.find(QueryResultStep).props().onCreateContractClicked();

    expect(navSpy).to.have.property('callCount', 1);
    // TODO: Test to ensure navSpy is called with correct path /contract/deploy
  });
});
