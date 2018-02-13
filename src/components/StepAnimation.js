import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Step.css';

function StepAnimation(props) {
  // direction should be either next or prev
  const { direction = 'next' } = props;
  return (<ReactCSSTransitionGroup 
          transitionName={{
            enter: `${direction}-enter`,
            leave: 'step-leave'
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
            {props.children}
          </ReactCSSTransitionGroup>);
}


export default StepAnimation;