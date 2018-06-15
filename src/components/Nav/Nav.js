import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

const Nav = () => (
  <div className="navbar">
    <div>
      <AppBar className="nav" position="fixed">
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/strength">
            Strength Training Page
          </Link>
        </li>
        <li>
          <Link to="/aerobic">
            Aerobic Training Page
          </Link>
        </li>
        <li>
          <Link to="/HIIT">
            High Intensity Interval Training Page
          </Link>
        </li>
        <li>
          <Link to="/yoga">
            Yoga Training Page
          </Link>
        </li>
      </ul>
      </AppBar>
    </div>
  </div>
);
export default Nav;
