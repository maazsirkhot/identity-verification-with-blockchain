import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import { issuer } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export class ApprovalRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get('/textract/getUserDetailsfromDB')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <div className="main-wrapper">
        <NavBar />
        <SideBar sidebar={issuer.sidebar} />
        <div className="sub-wrapper">
          <div className="container">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <br />
                  Requests
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApprovalRequests;
