import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tab from './components/tab';

const Tabs = ({ className, children, ...props }) => {
  return (
    <div {...props} className={classnames('tabs', className)}>
      <ul>{children}</ul>
    </div>
  );
};

Tabs.Tab = Tab;

Tabs.defaultProps = {
  style: undefined,
  className: undefined
};

Tabs.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Tabs;
