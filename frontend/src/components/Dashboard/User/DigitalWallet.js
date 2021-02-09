import React, { Component } from "react";
import DashboardNavbar from "../../Header/DashboardNavbar";
import SideBar from "../../Header/SideBar";
import "../../../assets/css/header.css";
import "../../../assets/css/dashboard.css";
// import "../../../assets/css/styles.css";
export class DigitalWallet extends Component {
  render() {
    return (
      <div class="main-wrapper">
        <DashboardNavbar />
        <SideBar />
        <div class="sub-wrapper digital-wallet">
          <div className="container">
            <div class="col-xl-12 col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Digital Wallet</h4>
                  <button class="custom-btn">
                    <i class="fas fa-plus"></i> <span>Add New</span>
                  </button>
                </div>
                <div class="card-body">
                  Here are your digital IDs. Select one to view it or add a new
                  one
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalWallet;
