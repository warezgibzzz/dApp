import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import CreateInitializer, { contractConstructor } from '../util/web3/contractInitializer';
import { deployContract } from '../actions/deploy';
import DeployContractForm from '../components/DeployContract/DeployContractForm';
import store from '../store';

const mapStateToProps = state => {
  const { loading, error, contract } = state.deploy;

  return {
    loading,
    error,
    contract
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeployContract: contractSpecs => {
      const web3 = store.getState().web3.web3Instance;
      const initializeContracts = CreateInitializer(contractConstructor.bind(null, web3));
      
      dispatch(deployContract({
        web3,
        contractSpecs
      }, initializeContracts(Contracts)));
    }
  };
};

const Deploy = connect(mapStateToProps, mapDispatchToProps)(DeployContractForm);

export default Deploy;
