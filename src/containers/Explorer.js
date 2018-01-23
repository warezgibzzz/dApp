import { connect } from "react-redux";

import ContractsList from "../components/ContractsList";
import { loadContracts } from "../actions/explorer";

const mapStateToProps = state => ({
  ...state.explorer
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadContracts())
});

const Explorer = connect(mapStateToProps, mapDispatchToProps)(ContractsList);

export default Explorer;
