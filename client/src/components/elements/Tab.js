import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ label, name, active, onClick }) => {
  return (
    <li className={`${active && 'is-active'} is-uppercase`}>
      <a href='#' onClick={() => onClick(name)}>
        {label}
      </a>
    </li>
  );
};

Tab.propTyoes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default Tab;
