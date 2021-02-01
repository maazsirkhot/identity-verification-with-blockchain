import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-fixed-top">
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
        </nav>
      </div>
    );
  }
}

export default NavBar;
