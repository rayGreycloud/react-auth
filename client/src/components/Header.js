import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Redux Auth</Link>
        <div />
        <Link to="/signup">Sign Up</Link>
        <div />
        <Link to="/signin">Sign In</Link>
        <div />
        <Link to="/signout">Sign Out</Link>
        <div />
        <Link to="/feature">Feature</Link>
      </div>
    );
  }
}

export default Header;
