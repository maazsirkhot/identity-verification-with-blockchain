import React, { Component } from "react";
import DashboardNavbar from "../../Header/DashboardNavbar";
import SideBar from "../../Header/SideBar";
import RequestItem from "./RequestItem";
import "../../../assets/css/header.css";
import "../../../assets/css/dashboard.css";

export class InformationRequests extends Component {
  render() {
    return (
      <div class="main-wrapper">
        <DashboardNavbar />
        <SideBar />
        <div class="sub-wrapper">
          <div className="container">
            <div class="col-xl-12 col-lg-12">
              <div class="card">
                <div class="card-body">
                  <br />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InformationRequests;
