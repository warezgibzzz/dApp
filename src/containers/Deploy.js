import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import DeployContractForm from '../components/DeployContract/DeployContractForm';

import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { deployContract } from '../actions/deploy';
import store from '../store';

const mapStateToProps = state => {
  const { contract, error, gas, loading } = state.deploy;
  const { network } = state.web3;

  return {
    contract,
    error,
    gas,
    loading,
    network
  };
};

const mapDispatchToProps = dispatch => {
  const { web3Instance, network } = store.getState().web3;
  const initializeContracts = CreateInitializer(
    contractConstructor.bind(null, web3Instance)
  );

  return {
    onDeployContract: contractSpecs => {
      dispatch(
        deployContract(
          {
            web3: web3Instance,
            contractSpecs,
            network
          },
          initializeContracts(Contracts)
        )
      );
    }
  };
};

const Deploy = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(DeployContractForm)
);

export default Deploy;
