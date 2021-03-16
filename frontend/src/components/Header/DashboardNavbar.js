import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export default function DashboardNavbar() {
  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  return (
    <div>
      <header className="fixed-top dashboard-header">
        <div style={{ margin: '0px 20px' }}>
          <div className="row">
            <div className="col-xl-12">
              <nav className="dashboard-navbar">
                <div className="d-flex align-items-center">
                  <Link class="mr-3" to="/">
                    <img
                      src={logo}
                      width="120"
                      height="50"
                      className="d-inline-block align-top"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="dashboard_log">
                  <div className="d-flex align-items-center">
                    <div className="profile_log dropdown">
                      <div className="user" data-toggle="dropdown">
                        <span className="thumb">
                          <i className="fas fa-user" />
                        </span>
                        <span className="name">
                          {localStorage.getItem('userName')}
                        </span>
                        <span className="arrow">
                          <i className="la la-angle-down" />
                        </span>
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link to="/" class="dropdown-item">
                          <i className="fas fa-user" /> Account
                        </Link>
                        <Link to="/" class="dropdown-item">
                          <i className="fas fa-cog" /> Setting
                        </Link>
                        <Link
                          to="/"
                          onClick={logout}
                          class="dropdown-item logout"
                        >
                          <i className="fas fa-sign-out-alt" /> Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
