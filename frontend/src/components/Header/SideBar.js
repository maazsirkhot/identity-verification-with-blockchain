import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class SideBar extends Component {
  render() {
    return (
      <div class="sidebar">
        <div class="menu">
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                <span>
                  <i class="fas fa-home"></i>
                </span>
                <span class="nav-text">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/wallet" activeClassName="active">
                <span>
                  <i class="fas fa-id-card"></i>
                </span>
                <span class="nav-text">Digital Credentials</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/requests" activeClassName="active">
                <span>
                  <i class="fas fa-envelope-open-text"></i>
                </span>
                <span class="nav-text">Requests</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">
                <span>
                  <i class="fas fa-cog"></i>
                </span>
                <span class="nav-text">Setting</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
