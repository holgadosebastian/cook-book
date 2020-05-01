import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tab = ({ className, children, name, active, onClick, ...props }) => {
  return (
    <li
      {...props}
      className={classnames('is-uppercase', className, {
        'is-active': active
      })}
    >
      <a href='#' onClick={() => onClick(name)}>
        {children}
      </a>
    </li>
  );
};

Tab.defaultProps = {
  className: PropTypes.string,
  onClick: () => null
};

Tab.propTyoes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default Tab;
