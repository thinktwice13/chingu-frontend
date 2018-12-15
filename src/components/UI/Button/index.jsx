/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors, borders, effects } from '../styles/variables';

const { node, oneOf, bool } = PropTypes;

const disabledStyles = css`
  background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.light_grey)};
  :hover {
    background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.light_grey)};
  }
`;

const getSize = ({ size }) => {
  switch (size) {
    case 'large':
      return css`
        font-size: 18px;
        padding: 12px;
        widows: 200px;
      `;
    case 'small':
      return css`
        font-size: 10px;
        padding: 5px;
        widows: 80px;
      `;
    default:
      return css`
        font-size: 14px;
        padding: 10px;
        widows: 150px;
      `;
  }
};

const StyledButton = styled.button`
  ${getSize}
  background-color: ${({ inverted }) => (inverted ? '#00000000' : colors.theme_green)};
  color: ${({ inverted }) => (inverted ? colors.theme_green : 'white')};
  text-transform: uppercase;
  border-radius: ${({ rounded }) =>
    rounded ? borders.button_border_radius_rounded : borders.button_border_radius};
  letter-spacing: 0.1em;
  text-align: center;
  border: ${({ inverted }) => (inverted ? `2px solid${colors.theme_green}` : 'none')};
  display: block;
  box-shadow: ${effects.box_shadow};
  :hover {
    background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.theme_green__hover)};
  }
  ${({ disabled }) => (disabled ? disabledStyles : '')}
`;

const Button = props => {
  const { children, ...restProps } = props;
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  size: oneOf(['small', 'regular', 'large']),
  rounded: bool,
  inverted: bool,
  disabled: bool,
};

Button.defaultProps = {
  type: 'button',
  size: 'regular',
  rounded: undefined,
  inverted: undefined,
  disabled: undefined,
};

export default Button;
