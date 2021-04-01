import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import Search from '../../Search';
import { verifier } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function SentRequests() {
  const [sentRequests, setSentRequests] = useState([]);
  useEffect(() => {
    axiosInstance()
      .get('/client/request')
      .then((res) => {
        setSentRequests(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
        alert('Something went wrong, please try again later!');
      });
  }, []);
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
                {sentRequests.map((requestDetails) => (
                  <RequestItem requestDetails={requestDetails} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
