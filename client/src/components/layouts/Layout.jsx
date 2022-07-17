import React from 'react';

import Navbar from '../core/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='container'>{children}</div>
    </>
  );
};

export default Layout;
