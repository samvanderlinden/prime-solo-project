import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
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
    </div>
  </div>
);

export default Nav;
