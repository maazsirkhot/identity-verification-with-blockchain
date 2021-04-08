import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import NewCustomRequests from './NewCustomRequests';
import EditCustomRequests from './EditCustomRequests';
import { verifier } from '../../../utils/sidebarConfig';
import axiosInstance from '../../../utils/axiosInstance';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function CustomRequests() {
  const [customRequest, setCustomRequests] = useState([]);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    axiosInstance()
      .get('/client/customRequest')
      .then((res) => {
        setCustomRequests(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }, []);

  function getDate(createdAt) {
    const currentdate = new Date(createdAt);
    return `${currentdate.getDate()} ${
      monthNames[currentdate.getMonth()]
    }, ${currentdate.getFullYear()}`;
  }

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
                {customRequest.length === 0
                  ? 'You have not created any custom requests yet!'
                  : customRequest.map((request) => (
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="request-item">
                          <div className="request-info">
                            <h5>{request.name}</h5>

                            <div className="request-date">
                              <strong>Created on:</strong>
                              <p> {getDate(request.createdAt)}</p>
                            </div>
                          </div>
                          <div className="request-date">
                            <strong>Created on:</strong>
                            <p> {getDate(request.createdAt)}</p>
                          </div>
                          <EditCustomRequests customrequest={request} />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
