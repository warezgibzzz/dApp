import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import DeployContractForm from '../components/DeployContract/DeployContractForm';

import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { deployContract, resetDeploymentState } from '../actions/deploy';
import store from '../store';

const mapStateToProps = state => {
  const {
    contract,
    error,
    gas,
    loading,
    currentStep,
    contractDeploymentTxHash,
    collateralPoolDeploymentTxHash
  } = state.deploy;

  const { network } = state.web3;

  return {
    contract,
    error,
    gas,
    loading,
    network,
    currentStep,
    contractDeploymentTxHash,
    collateralPoolDeploymentTxHash
  };
};

const mapDispatchToProps = dispatch => {
  const { web3Instance } = store.getState().web3;
  const initializeContracts = CreateInitializer(
    contractConstructor.bind(null, web3Instance)
  );

  return {
    onDeployContract: contractSpecs => {
      dispatch(
        deployContract(
          {
            web3: web3Instance,
            contractSpecs
          },
          initializeContracts(Contracts)
        )
      );
    },
    onResetDeploymentState: preservations => {
      dispatch(resetDeploymentState(preservations));
    }
  };
};

const Deploy = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(DeployContractForm)
);

export default Deploy;
