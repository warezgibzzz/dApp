import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Step.css';

const validDirections = ['next', 'prev'];

function isValidDirection(direction) {
  return validDirections.find((it) => it === direction);
}

function StepAnimation(props) {
  const { direction = 'next' } = props;

  if (!isValidDirection(direction)) {
    throw new Error(`Invalid StepAnimation direction [${direction}]. 
    Valid direction are 'next' and 'prev'`);
  }

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