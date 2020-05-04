import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CardContent = ({ className, children, ...props }) => {
  return (
    <div {...props} className={classnames('card-content', className)}>
      {children}
    </div>
  );
};

CardContent.defaultProps = {
  style: undefined,
  className: undefined,
  children: null
};

CardContent.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node
};

export default CardContent;
