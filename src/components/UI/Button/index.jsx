/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import themes from 'components/UI/styles/themes';
import { colors, borders, effects } from 'components/UI/styles/variables';
import media from 'components/UI/styles/mediaSizes';

const { node, oneOf, oneOfType, bool, string, shape, func, object } = PropTypes;

const disabledStyles = css`
  background-color: ${colors.light_grey};
  border: 1px solid ${colors.light_grey};
  :hover {
    background-color: ${({ inverted }) => (inverted ? '#00000011' : colors.light_grey)};
  }
`;

const getSize = {
  regular: css`
    font-size: 14px;
    min-width: 150px;
  `,
  small: css`
    font-size: 10px;
    min-width: 80px;
  `,
  large: css`
    font-size: 18px;
    min-width: 200px;
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
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.theme.borderStyle};
  display: block;
  box-shadow: ${effects.box_shadow};
  margin: 0.5em;
  height: 3em;
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
  borderStyle: theme.bg,
  hover: `${theme.bg}11`, // Adds opacity (Assumes hex color code) TODO: FIXME
});

// ======= EXPORT ========= //
const Button = props => {
  const { children, component, theme, inverted, href, to, replace, innerRef, ...restProps } = props;

  // Get color theme
  const t = inverted ? invertTheme(themes[theme]) : themes[theme];

  // If href or path props provided, will render as anchor tag or React Rotuer Link
  let componentProps;
  if (component) {
    componentProps = { as: component };
  } else if (href) {
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
  component: oneOfType([string, func, object]), // TODO: Require className
  to: oneOfType([
    string,
    shape({
      pathname: string,
    }),
  ]),
  href: string,
  rounded: bool,
  inverted: bool,
  disabled: bool,
};

Button.defaultProps = {
  type: 'button',
  size: 'regular',
  theme: 'primary',
  component: undefined,
  to: undefined,
  href: undefined,
  rounded: undefined,
  inverted: undefined,
  disabled: undefined,
};

export default Button;
