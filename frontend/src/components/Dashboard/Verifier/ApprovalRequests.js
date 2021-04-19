import React, { Component } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import NavBar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import Search from '../../Search';
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
    axiosInstance()
      .get('/verifier/fetch/getVerifierData')
      .then((res) => {
        this.setState({
          verifierrequests: res.data.verifierData,
        });
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
            <Search />

            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <br />

                  {this.state.verifierrequests.length > 0 ? (
                    <table
                      style={{ width: '100%' }}
                      class="mb-0 table-responsive-sm"
                    >
                      <tbody>
                        {this.state.verifierrequests.map((data) => (
                          <RequestItem userdata={data} />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    'No new requests'
                  )}
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
