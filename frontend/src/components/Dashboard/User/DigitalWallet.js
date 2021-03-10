import React from 'react';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import DigitalID from './DigitalID';
import DocumentUpload from '../../Verification/DocumentUpload';
import { user } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function DigitalWallet() {
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={user.sidebar} />
      <div className="sub-wrapper digital-wallet">
        <div className="container">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Digital Wallet</h4>
                {/* <button class="custom-btn add-btn">
                    <i class="fas fa-plus"></i> <span>Add New</span>
                  </button> */}
                <DocumentUpload />
              </div>
              <div className="card-body">
                Here are your digital IDs. Select one to view it or add a new
                one
                <br /> <br />
                <DigitalID />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
