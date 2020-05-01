import React from 'react';
import PropTypes from 'prop-types';

const SpinnerContainer = ({ className, children, message, ...props }) => {
  return (
    <div {...props} className='container has-text-centered is-fullheight'>
      {children}
      {message && <p className='is-size-6 has-text-grey mt2'>{message}</p>}
    </div>
  );
};

SpinnerContainer.defaultProps = {
  style: undefined,
  className: undefined,
  message: undefined
};

SpinnerContainer.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  message: PropTypes.string
};

export default SpinnerContainer;
