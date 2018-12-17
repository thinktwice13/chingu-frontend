/* eslint-disable  react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import variables from 'components/UI/styles/variables';
import media from 'components/UI/styles/mediaSizes';
import { getColors, getSize } from 'components/UI/Button/styles';

const { node, oneOf, oneOfType, bool, string, shape, func, object } = PropTypes;

const StyledButton = styled.div`
  text-transform: uppercase;
  border-radius: ${({ rounded }) => (rounded ? '20px' : '5px')};
  letter-spacing: 0.1em;
  text-align: center;
  border-width: 2px;
  border-style: solid;
  display: block;
  box-shadow: ${variables.effects.box_shadow};
  margin: 0.5em;
  height: 3em;
  
  ${getColors}
  ${getSize}

  @media(max-width:${media.phone}px) {
    width: 100%;
  }
`;

// ======= EXPORT ========= //
const Button = props => {
  const { children, component, href, to, replace, innerRef, ...restProps } = props;

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
    <StyledButton {...componentProps} {...restProps}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  size: oneOf(['small', 'default', 'large']),
  theme: oneOf(['default', 'info', 'error', 'warning']),
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
  size: 'default',
  theme: 'default',
  component: undefined,
  to: undefined,
  href: undefined,
  rounded: undefined,
  inverted: undefined,
  disabled: undefined,
};

export default Button;
