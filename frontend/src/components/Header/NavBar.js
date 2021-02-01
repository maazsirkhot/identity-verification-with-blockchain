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
          <div class="profile">
            <img alt="Hetal" class="img-fluid rounded-circle" />
            <h2>Hetal Shah</h2>
            <div class="social-links text-center">
              <a
                href="https://github.com/ihetal"
                target="_blank"
                class="github"
                rel="noreferrer"
              >
                <i class="fa fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ihetalshah/"
                target="_blank"
                class="linkedin"
                rel="noreferrer"
              >
                <i class="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
          <nav class="nav-menu">
            <ul>
              <li>
                <a href="/">
                  <i
                    class="fa fa-home"
                    aria-hidden="true"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Home
                </a>
              </li>
              <li>
                <a href="/#about">
                  <i
                    class="fa fa-user"
                    aria-hidden="true"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  About
                </a>
              </li>

              <li>
                <a href="/#experience">
                  <i class="fa fa-file" aria-hidden="true"></i> Experience
                </a>
              </li>
              <li>
                <a href="/#projects">
                  <i class="fa fa-folder-open" aria-hidden="true"></i> Projects
                </a>
              </li>
              <li>
                <a href="/#contact">
                  <i class="fa fa-envelope" aria-hidden="true"></i> Contact Me
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
                class="d-inline-block align-top name-logo2"
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
                  <a class="nav-link" href="/#about">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/#experience">Login</a>
                </li>
                <li>
                  <a href="/#projects">Sign Up</a>
                </li>
                <li>
                  <a href="/#contact">Contact Us</a>
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
