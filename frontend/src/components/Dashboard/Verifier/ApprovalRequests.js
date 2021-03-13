import React, { Component } from 'react';
// import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';
import NavBar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import { issuer } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export class ApprovalRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifierrequests: [],
    };
  }

  componentDidMount() {
    console.log('In here 123', localStorage.getItem('token'));
    // axios
    //   .get('/verifier/fetch/getVerifierData')
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState({
    //       verifierrequests: res.data.verifierData,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    axiosInstance()
      .get('/verifier/fetch/getVerifierData')
      .then((res) => {
        console.log(res.data);
        this.setState({
          verifierrequests: res.data.verifierData,
        });
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
                  {this.state.verifierrequests.length > 0
                    ? this.state.verifierrequests.map((data) => (
                        <RequestItem userdata={data} />
                      ))
                    : 'No new requests'}
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
