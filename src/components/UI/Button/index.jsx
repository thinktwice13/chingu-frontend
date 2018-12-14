/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, borders, effects } from 'components/UI/styles/variables';

const { node, oneOf, bool } = PropTypes;

const StyledButton = styled.button`
  width: 150px;
  font-size: 14px;
  background-color: ${colors.theme_green};
  color: white;
  text-transform: uppercase;
  border-radius: ${borders.button_border_radius_rounded};
  padding: 10px;
  letter-spacing: 0.1em;
  text-align: center;
  border: none;
  display: block;
  box-shadow: ${effects.box_shadow};
  &:hover {
    background-color: ${colors.theme_green__hover};
  }
`;

const Button = props => {
  const { children, ...restProps } = props;
  return <StyledButton {...restProps}>{children}</StyledButton>;
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
  rounded: undefined,
  inverted: undefined,
  size: 'regular',
};

export default Button;
