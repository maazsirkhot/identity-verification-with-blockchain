import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import NewCustomRequests from './NewCustomRequests';
import { verifier } from '../../../utils/sidebarConfig';
import axiosInstance from '../../../utils/axiosInstance';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function DigitalWallet() {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    axiosInstance()
      .get('/textract/getUserDetailsFromDB')
      .then((res) => {
        setUserDetails(res.data.userDetails);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={verifier.sidebar} />
      <div className="sub-wrapper digital-wallet">
        <div className="container">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Custom Requests</h4>
                <NewCustomRequests />
              </div>
              <div className="card-body">
                {userDetails.length === 0 ? (
                  'You have not created any custom requests yet!'
                ) : (
                  <>
                    <br /> <br />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
