import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { isAuth, signout } from '../../utils/auth';

const Navbar = () => {
  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link to='/' className='text-light nav-link'>
          Home
        </Link>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link to='/signup' className='text-light nav-link'>
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signin' className='text-light nav-link'>
              Signin
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && (
        <li className='nav-item'>
          <span
            className='nav-link'
            onClick={() => {
              signout(() => {
                window.location.reload();
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
