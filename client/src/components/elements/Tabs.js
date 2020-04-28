import React from 'react';

const Tabs = ({ children }) => {
  return (
    <div className='tabs'>
      <ul>{children}</ul>
    </div>
  );
};

export default Tabs;
