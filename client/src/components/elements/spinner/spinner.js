import React from 'react';
import PropTypes from 'prop-types';
import SpinnerContainer from './components/container';

const Spinner = ({ size, centered }) => {
  return (
    <span
      className={`loader is-ib ${size && `is-${size}`} ${
        centered && `is-centered`
      }`}
    ></span>
  );
};

Spinner.Container = SpinnerContainer;

Spinner.defaultProps = {
  size: undefined,
  centered: false
};

Spinner.propTypes = {
  size: PropTypes.string,
  centered: PropTypes.bool
};

export default Spinner;
