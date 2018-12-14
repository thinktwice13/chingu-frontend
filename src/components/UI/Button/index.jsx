/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';

const { node, oneOf, bool } = PropTypes;

const Button = props => {
  const { children, ...restProps } = props;
  return <button {...restProps}>{children}</button>;
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  rounded: bool,
  inverted: bool,
  size: oneOf(['small', 'regular', 'large']),
};

Button.defaultProps = {
  type: 'button',
  rounded: false,
  inverted: false,
  size: 'regular',
};

export default Button;
