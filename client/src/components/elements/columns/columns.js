import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Column from './components/column';

const Columns = ({
  className,
  children,
  breakpoint,
  multiline,
  centered,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames('columns', className, {
        [`is-${breakpoint}`]: breakpoint,
        'is-multiline': multiline,
        'is-centered': centered
      })}
    >
      {children}
    </div>
  );
};

Columns.Column = Column;

Columns.defaultProps = {
  style: undefined,
  className: undefined,
  breakpoint: undefined,
  multiline: false,
  centered: false
};

Columns.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  breakpoint: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  multiline: PropTypes.bool,
  centered: PropTypes.bool
};

export default Columns;
