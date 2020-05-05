import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ContainerWrapper = ({ className, children, ...props }) => {
  return (
    <div {...props} className={classnames('container-wrapper', className)}>
      {children}
    </div>
  );
};

ContainerWrapper.defaultProps = {
  style: undefined,
  className: undefined,
  children: null
};

ContainerWrapper.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node
};

export default ContainerWrapper;
