import { connect } from "react-redux";

import { deployContract } from "../actions/deploy";
import store from "../store";
import Contracts from '../Contracts.js';
import DeployContractForm from '../components/DeployContract/DeployContractForm';

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
      dispatch(deployContract({
        web3: store.getState().web3.web3Instance,
        contractSpecs
      }, Contracts));
    }
  };
};

const Deploy = connect(mapStateToProps, mapDispatchToProps)(DeployContractForm);

export default Deploy;
