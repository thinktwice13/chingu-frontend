import React from 'react';
import PropTypes from 'prop-types';

const Buttton = props => {
  const { children } = props;
  return <button>{children}</button>;
};

Buttton.propTypes = {};

export default Buttton;
