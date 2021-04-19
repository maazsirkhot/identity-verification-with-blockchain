import React, { useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import Search from '../../Search';
import { user } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function InformationRequests() {
  useEffect(() => {
    axiosInstance()
      .get('/user/request')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }, []);
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={user.sidebar} />
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
