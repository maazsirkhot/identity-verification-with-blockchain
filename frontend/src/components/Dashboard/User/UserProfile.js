import React, { useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import { user } from '../../../utils/sidebarConfig';

export default function UserProfile() {
  useEffect(() => {
    const params = {
      option: 'ALL',
    };
    axiosInstance()
      .get('/user/fetch/profile', { params })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={user.sidebar} />
      <div className="sub-wrapper">
        <div className="container">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-body">User Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
