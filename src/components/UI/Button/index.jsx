/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import themes from 'components/UI/styles/themes';
import { colors, borders, effects } from 'components/UI/styles/variables';
import media from 'components/UI/styles/mediaSizes';

const { node, oneOf, oneOfType, bool, string, shape } = PropTypes;

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
    width: 150px;
  `,
  small: css`
    font-size: 10px;
    padding: 5px;
    width: 80px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px;
    width: 200px;
  `,
};

const StyledButton = styled.div`
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

  @media(max-width:${media.phone}px) {
    width: 100%;
  }
`;

/**
 * @description inverts color theme
 * @param {Object} theme
 * @returns {Object} inverted theme with hover color based on foreground with low opacity //TODO: adjust
 */
const invertTheme = theme => ({
  fg: theme.bg,
  bg: theme.fg,
  hover: `${theme.bg}11`, // Adds opacity (Assumes hex color code) TODO: FIXME
});

// ======= EXPORT ========= //
const Button = props => {
  const { children, theme, inverted, href, to, replace, innerRef, ...restProps } = props;

  // Get color theme
  const t = inverted ? invertTheme(themes[theme]) : themes[theme];

  // If href or path props provided, will render as anchor tag or React Rotuer Link
  let componentProps;
  if (href) {
    componentProps = {
      href,
      rel: 'noopener noreferrer',
      target: '_blank',
      as: 'a',
    };
  } else if (to) {
    componentProps = { to, replace, innerRef, as: Link };
  } else {
    componentProps = { as: 'button' };
  }

  return (
    <StyledButton theme={t} {...componentProps} {...restProps}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  size: oneOf(['small', 'regular', 'large']),
  theme: oneOf(['primary', 'secondary', 'info', 'error', 'warning']),
  rounded: bool,
  inverted: bool,
  disabled: bool,
  href: string,
  to: oneOfType([
    string,
    shape({
      pathname: string,
    }),
  ]),
};

Button.defaultProps = {
  type: 'button',
  size: 'regular',
  theme: 'primary',
  rounded: undefined,
  inverted: undefined,
  disabled: undefined,
  href: undefined,
  to: undefined,
};

export default Button;
