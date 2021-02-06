import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";
import logowhite from "../../assets/img/logo-white.png";
import logo from "../../assets/img/logo.png";

export class NavBar extends Component {
  render() {
    return (
      <div>
        <div id="mysidemenu">
          <nav class="nav-menu">
            <ul>
              <li>
                <a href="/">
                  <i
                    class="fa fa-home"
                    aria-hidden="true"
                    style={{ fontSize: "18px" }}
                  ></i>
                  Home
                </a>
              </li>
              <li>
                <a href="/#about">
                  <i
                    class="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "18px" }}
                  ></i>
                  Dashboard
                </a>
              </li>

              <li>
                <Link to="/login">
                  <i class="fa fa-file" aria-hidden="true"></i> Login
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <i class="fa fa-folder-open" aria-hidden="true"></i> Signup
                </Link>
              </li>
              <li>
                <a href="/#contact">
                  <i class="fa fa-envelope" aria-hidden="true"></i> Contact us
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <header id="header" class="fixed-top header-transparent">
          <button type="button" class="mobile-nav-toggle d-lg-none">
            <i class="fa fa-bars"></i>
          </button>
          <div class="container d-flex align-items-center">
            <a class="logo mr-auto" href="/">
              <img
                src={logowhite}
                width="120"
                height="45"
                class="d-inline-block align-top name-logo"
                alt=""
              />
              <img
                src={logo}
                width="120"
                height="45"
                class="align-top name-logo2"
                alt=""
              />
            </a>

            <nav class="main-nav d-none d-lg-block">
              <ul>
                <li>
                  <a class="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <Link class="nav-link" to="/userdashboard">
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
                  <a class="nav-link" href="/#contact">
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
}

export default NavBar;

/* <nav class="navbar navbar-expand-lg navbar-light navbar-fixed-top">
          <Link to="/" class="navbar-brand" href="#">
            <img
              src={logo}
              width="120"
              height="50"
              class="d-inline-block align-top"
              alt=""
            />
          </Link>

          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to="/" class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav> */
