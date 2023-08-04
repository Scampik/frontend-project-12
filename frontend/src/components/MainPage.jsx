import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/Login'>Login</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  )
};

export default MainPage;