import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { findContract } from '../actions/find';
import CreateInitializer, { contractConstructor } from '../util/web3/contractInitializer';
import { processContractsList } from '../util/utils';
import FindContractForm from '../components/FindContract/FindContractForm';
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
      const initializeContracts = CreateInitializer(contractConstructor.bind(null, web3));
      const contracts = initializeContracts(Contracts);
      const processContracts = processContractsList.bind(
        null, 
        contracts.MarketContract, 
        contracts.MarketCollateralPool, 
        contracts.CollateralToken,
        contracts.ERC20
      );
      
      dispatch(findContract(
        { web3, processContracts },
        contractAddress,
        { 
          MarketContractRegistry: contracts.MarketContractRegistry, 
          CollateralToken: contracts.CollateralToken 
        }
      ));
    }
  };
};

const Find = connect(mapStateToProps, mapDispatchToProps)(FindContractForm);

export default Find;
