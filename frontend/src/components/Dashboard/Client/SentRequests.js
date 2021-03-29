import React from 'react';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import Search from '../../Search';
import { verifier } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function SentRequests() {
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={verifier.sidebar} />
      <div className="sub-wrapper">
        <div className="container">
          <Search />
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-body">
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
