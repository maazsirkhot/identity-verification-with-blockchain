import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/header.css';
import logowhite from '../../assets/img/logo-white.png';
import logo from '../../assets/img/logo.png';

export default function NavBar() {
  let navigation = '/user/wallet';
  if (localStorage.getItem('userType') === 'client') {
    navigation = '/client/requests';
  } else if (localStorage.getItem('userType') === 'verifier') {
    navigation = '/verifier/requests';
  }
  return (
    <div>
      <div id="mysidemenu">
        <nav className="nav-menu">
          <ul>
            <li>
              <a href="/">
                <i
                  className="fa fa-home"
                  aria-hidden="true"
                  style={{ fontSize: '18px' }}
                />
                Home
              </a>
            </li>
            <li>
              <Link to={navigation}>
                <i
                  className="fa fa-user"
                  aria-hidden="true"
                  style={{ fontSize: '18px' }}
                />
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/login">
                <i className="fa fa-file" aria-hidden="true" /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="fa fa-folder-open" aria-hidden="true" /> Signup
              </Link>
            </li>
            <li>
              <a href="/#contact">
                <i className="fa fa-envelope" aria-hidden="true" /> Contact us
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <header id="header" className="fixed-top header-transparent">
        <button type="button" className="mobile-nav-toggle d-lg-none">
          <i className="fa fa-bars" />
        </button>
        <div className="container d-flex align-items-center">
          <a className="logo mr-auto" href="/">
            <img
              src={logowhite}
              width="120"
              height="45"
              className="d-inline-block align-top name-logo"
              alt=""
            />
            <img
              src={logo}
              width="120"
              height="45"
              className="align-top name-logo2"
              alt=""
            />
          </a>

          <nav className="main-nav d-none d-lg-block">
            <ul>
              <li>
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li>
                <Link class="nav-link" to="/user/wallet">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link class="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <a className="nav-link" href="/#contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
