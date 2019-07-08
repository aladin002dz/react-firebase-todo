import React, { Component } from 'react';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            React-Firebase Todos
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <div className="nav-item nav-link">
                Welcome
              </div >
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/login">
                log in
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/register">
                register
              </Link>
            )}
            {user && (
              <Link
                className="nav-item nav-link"
                to="/login"
                onClick={e => logOutUser(e)}
              >
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
