const initialState = {
  contract: null,
  error: null,
  gas: 5700000,
  loading: false,
  currentStep: null,
  contractDeploymentTxHash: null,
  collateralPoolDeploymentTxHash: null
};

export default function reducer(
  state = Object.assign({}, initialState),
  action
) {
  const actionType = 'DEPLOY_CONTRACT';
  switch (action.type) {
    case `${actionType}_RESET_STATE`:
      return Object.assign(
        {},
        action.payload.preservations || {},
        initialState
      );

    case `${actionType}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
        currentStep: 'pending'
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        contract: action.payload,
        error: null,
        currentStep: 'fulfilled'
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        loading: false,
        contract: null,
        error: action.payload,
        currentStep: 'rejected'
      };

    case `${actionType}_UPDATE_GAS`:
      return {
        ...state,
        gas: action.payload
      };

    case `${actionType}_CONTRACT_DEPLOYMENT_STARTED`:
      return {
        ...state,
        currentStep: 'contractDeploying'
      };

    case `${actionType}_CONTRACT_DEPLOYED`:
      return {
        ...state,
        contractDeploymentTxHash: action.payload.deploymentResults.tx,
        currentStep: 'collateralPoolDeploying'
      };

    case `${actionType}_COLLATERAL_POOL_DEPLOYED`:
      return {
        ...state,
        collateralPoolDeploymentTxHash: action.payload.deploymentResults.tx,
        currentStep: 'deploymentComplete'
      };

    default:
      return state;
  }
}
