// tsx is the typescript extension for jsx files
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

// accepts user from Layout as props as User (or null) 
const Nav = (props: { user: User | null }) => {

  const logout = async () => {
    await axios.post('logout')
  }

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          {/* since the user can be null thus the '?' */}
          <Link to='/profile' className="nav-link px-3">{props.user?.first_name} {props.user?.last_name}</Link>
        </div>
        <div className="nav-item text-nowrap">
          <Link to='/login' className="nav-link px-3"
            onClick={logout}
          >Sign out</Link>
        </div>
      </div>
    </header>
  );
}

export default Nav;