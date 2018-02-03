import React, { Component } from 'react';
import qs from 'query-string';

import QuickDeployment from './QuickDeployment';
import GuidedDeployment from './GuidedDeployment';

class DeployContractForm extends Component {

  handleDeploy(values) {
    this.props.onDeployContract(values);
  }

  getQuickDeploymentComponent() {
    return <QuickDeployment 
              onDeployContract={this.handleDeploy.bind(this)}
              {...this.props} />;
  }

  getGuidedDeploymentComponent() {
    return <GuidedDeployment 
              onDeployContract={this.handleDeploy.bind(this)}
              {...this.props} />;
  }

  render() {
    const { mode = "" } = qs.parse(this.props.location.search);
    
    return (mode === "guided") ? this.getGuidedDeploymentComponent() 
      : (mode === "quick") ? this.getQuickDeploymentComponent() 
      : this.getQuickDeploymentComponent();
  }
}

export default DeployContractForm;
