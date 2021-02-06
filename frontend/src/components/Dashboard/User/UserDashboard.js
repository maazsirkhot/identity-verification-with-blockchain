import React, { Component } from "react";
import DashboardNavbar from "../../Header/DashboardNavbar";
import SideBar from "../../Header/SideBar";
import "../../../assets/css/header.css";
import "../../../assets/css/dashboard.css";
export class UserDashboard extends Component {
  render() {
    return (
      <div class="main-wrapper">
        <DashboardNavbar />
        <SideBar />
      </div>
    );
  }
}

export default UserDashboard;
