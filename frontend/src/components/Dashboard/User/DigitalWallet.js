import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import DigitalID from './DigitalID';
import DocumentUpload from '../../Verification/DocumentUpload';
import { user } from '../../../utils/sidebarConfig';
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
      <SideBar sidebar={user.sidebar} />
      <div className="sub-wrapper digital-wallet">
        <div className="container">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Digital Wallet</h4>
                <DocumentUpload />
              </div>
              <div className="card-body">
                {userDetails.length === 0 ? (
                  "You do not have any digital ID's uploaded"
                ) : (
                  <>
                    Here are your digital IDs. Select one to view it or add a
                    new one
                    <br /> <br />
                    {userDetails.map((data) => (
                      <DigitalID userDetails={data} />
                    ))}
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
