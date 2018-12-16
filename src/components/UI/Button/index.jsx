/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import themes from 'components/UI/styles/themes';
import { colors, borders, effects } from '../styles/variables';

const { node, oneOf, bool } = PropTypes;

const disabledStyles = css`
  background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.light_grey)};
  :hover {
    background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.light_grey)};
  }
`;

const getSize = {
  regular: css`
    font-size: 14px;
    padding: 10px;
    widows: 150px;
  `,
  small: css`
    font-size: 10px;
    padding: 5px;
    widows: 80px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px;
    widows: 200px;
  `,
};

const StyledButton = styled.button`
  ${props => getSize[props.size]}
  color: ${({ theme }) => theme.fg};
  background-color: ${({ theme }) => theme.bg};
  text-transform: uppercase;
  border-radius: ${({ rounded }) =>
    rounded ? borders.button_border_radius_rounded : borders.button_border_radius};
  letter-spacing: 0.1em;
  text-align: center;
  border: 2px solid ${props => props.theme.fg};
  display: block;
  box-shadow: ${effects.box_shadow};
  :hover {
    background-color: ${({ theme }) => theme.hover};
  }
  ${({ disabled }) => (disabled ? disabledStyles : '')}
`;

/**
 * @description gets color theme from theme name and 'inverted' flag
 * @param {string} theme must be on of [primary, secondary, error, warning, info]
 * @param {bool} inverted
 * @returns {Object} theme colors object {fg, bg, hover}
 */
const getTheme = (theme, inverted) => {
  const t = themes[theme];
  if (inverted) {
    return {
      fg: t.bg,
      bg: t.fg,
      hover: `${t.bg}11`, // Adds opacity (Assumes hex color code) TODO: FIXME
    };
  }
  return t;
};

// ======= EXPORT ========= //
const Button = props => {
  const { children, theme, inverted, ...restProps } = props;

  return (
    <StyledButton theme={getTheme(theme, inverted)} {...restProps}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  size: oneOf(['small', 'regular', 'large']),
  rounded: bool,
  inverted: bool,
  disabled: bool,
  theme: oneOf(['primary', 'secondary', 'info', 'error', 'warning']),
};

Button.defaultProps = {
  type: 'button',
  size: 'regular',
  rounded: undefined,
  inverted: undefined,
  disabled: undefined,
  theme: 'primary',
};

export default Button;
