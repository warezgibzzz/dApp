import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import showMessage from '../components/message';
import FindContractForm from '../components/FindContract/FindContractForm';

import { findContract } from '../actions/find';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { processContractsList } from '../util/contracts';
import FormValidators from '../util/forms/Validators';
import store from '../store';

const mapStateToProps = state => {
  const { loading, error, contract } = state.find;

  return {
    loading,
    error,
    contract
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFindContract: contractAddress => {
      const web3 = store.getState().web3.web3Instance;
      const initializeContracts = CreateInitializer(
        contractConstructor.bind(null, web3)
      );
      const contracts = initializeContracts(Contracts);
      const processContracts = processContractsList.bind(
        null,
        contracts.MarketContract,
        contracts.MarketCollateralPool,
        contracts.CollateralToken,
        contracts.ERC20
      );

      dispatch(
        findContract({ web3, processContracts }, contractAddress, {
          MarketContractRegistry: contracts.MarketContractRegistry,
          CollateralToken: contracts.CollateralToken
        })
      );
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(
    {
      validators: FormValidators(store.getState().web3.web3Instance),
      showErrorMessage: showMessage.bind(showMessage, 'error'),
      showSuccessMessage: showMessage.bind(showMessage, 'success')
    },
    ownProps,
    stateProps,
    dispatchProps
  );

const Find = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(FindContractForm)
);

export default Find;
