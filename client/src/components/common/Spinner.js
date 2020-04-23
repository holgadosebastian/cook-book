import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ size }) => {
  return <span className={`loader is-ib ${size && `is-${size}`}`}></span>;
};

Spinner.propTypes = {
  size: PropTypes.string
};

export default Spinner;
