import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";
import logo from "../../assets/img/logo.png";

export class DashboardNavbar extends Component {
  render() {
    return (
      <div>
        <header class="fixed-top dashboard-header">
          <div style={{ margin: "0px 20px" }}>
            <div class="row">
              <div class="col-xl-12">
                <nav class="dashboard-navbar">
                  <div class="d-flex align-items-center">
                    <Link class="mr-3" to="/">
                      <img
                        src={logo}
                        width="120"
                        height="50"
                        class="d-inline-block align-top"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div class="dashboard_log">
                    <div class="d-flex align-items-center">
                      <div class="profile_log dropdown">
                        <div class="user" data-toggle="dropdown">
                          <span class="thumb">
                            <i class="fas fa-user"></i>
                          </span>
                          <span class="name">Hetal Shah</span>
                          <span class="arrow">
                            <i class="la la-angle-down"></i>
                          </span>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a href="accounts.html" class="dropdown-item">
                            <i class="fas fa-user"></i> Account
                          </a>
                          <a href="settings.html" class="dropdown-item">
                            <i class="fas fa-cog"></i> Setting
                          </a>
                          <a href="signin.html" class="dropdown-item logout">
                            <i class="fas fa-sign-out-alt"></i> Logout
                          </a>
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
}

export default DashboardNavbar;
