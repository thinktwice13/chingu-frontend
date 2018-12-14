/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';

const { node, oneOf } = PropTypes;

const Button = props => {
  const { children, ...restProps } = props;
  return <button {...restProps}>{children}</button>;
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
