import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContainerWrapper from './components/wrapper';

const Container = ({ className, children, fluid, ...props }) => {
  return (
    <div
      {...props}
      className={classnames('container', className, {
        'is-fluid': fluid
      })}
    >
      {children}
    </div>
  );
};

Container.Wrapper = ContainerWrapper;

Container.defaultProps = {
  style: undefined,
  className: undefined,
  children: null,
  fluid: false
};

Container.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  fluid: PropTypes.bool
};

export default Container;
