import React, { useEffect, useState } from 'react';
import logo from '../../../assets/img/logo_v2.png';
import AssignRequest from './AssignRequest';
import AssignRole from './AssignRole';
import RequestDetails from './RequestDetails';
import axiosInstance from '../../../utils/axiosInstance';

export default function RequestInfo({ requestDetails }) {
  const [activeTabId, setactiveTabId] = useState(0);
  const [showtab, setShowTab] = useState(false);
  const [approvedRequestInfo, setApprovedRequestInfo] = useState('');
  const [notavailableFields, setNotAvailableFields] = useState([]);
  function isDisabled() {
    if (notavailableFields.length > 0) return true;
    return false;
  }

  const activeTab = [
    <AssignRequest requestId={requestDetails._id} isDisabled={isDisabled} />,
    <AssignRole
      requestId={requestDetails._id}
      client={requestDetails.client}
      isDisabled={isDisabled}
    />,
  ];

  useEffect(() => {
    if (requestDetails.status === 'PENDING') {
      setShowTab(true);
    }
    setNotAvailableFields(
      requestDetails.fieldsRequested.filter(
        (field) => field.isAvailable === false
      )
    );
  }, []);

  function getRequestDetails() {
    const params = {
      requestId: requestDetails._id,
    };
    if (requestDetails.status === 'APPROVED') {
      if (requestDetails.typeOfRequest === 'role_assign') {
        axiosInstance()
          .get('/user/assignRole', { params })
          .then((res) => {
            if (res.data.data.length > 0)
              setApprovedRequestInfo(res.data.data[0]);
            else setApprovedRequestInfo('');
          })
          .catch((err) => {
            console.log(err);
            alert('Something went wrong! Please try again later');
          });
      } else {
        axiosInstance()
          .get(`/client/fetch/post/${requestDetails._id}`)
          .then((res) => {
            setApprovedRequestInfo(res.data.postData);
          })
          .catch((err) => {
            console.log(err);
            alert('Something went wrong! Please try again later');
          });
      }
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#request-info${requestDetails._id}`}
        onClick={(e) => {
          e.preventDefault();
          getRequestDetails();
        }}
      >
        <div className="col-xs-2 col-md-4 col-2 text-center pt-2 pb-2 bg-light-dark">
          <i class="fas fa-info" />
        </div>
        <div
          className="col-xs-8 col-md-10 col-5 pt-2 pb-2 text-center header"
          style={{ minWidth: '82px' }}
        >
          <h4>More Info</h4>
        </div>
      </button>
      <div
        className="modal modal-backdrop fade in"
        id={`request-info${requestDetails._id}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: '450px' }}
        >
          <div className="modal-content">
            <div className="theme-modal-header">
              <div className="title">
                <img src={logo} alt="logo" width="100" />
                <br />
                <i className="fas fa-lock" /> Secure Data Transfer
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="card-body ">
              {showtab ? (
                <>
                  <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                      <a
                        data-toggle="tab"
                        class="nav-link active"
                        onClick={(e) => {
                          e.preventDefault();
                          setactiveTabId(0);
                        }}
                        aria-hidden
                      >
                        Request
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        data-toggle="tab"
                        class="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setactiveTabId(1);
                        }}
                        aria-hidden
                      >
                        Assign a Role
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content">
                    <div class="tab-pane in active">
                      <br />
                      <p style={{ textAlign: 'center' }}>
                        {requestDetails.client.username} is requesting the
                        following information
                      </p>
                      {requestDetails.fieldsRequested.map((fieldsRequested) => (
                        <div class="form-row mb-2">
                          <div class="col">
                            {fieldsRequested.fieldName}
                            <br />
                            <small>({fieldsRequested.userDisplay})</small>
                            <br />
                          </div>
                          <div class="col-1">
                            {fieldsRequested.isAvailable ? (
                              <i
                                class="far fa-check-circle"
                                style={{ color: 'green' }}
                              />
                            ) : (
                              <>
                                <i
                                  class="fas fa-times-circle"
                                  style={{ color: 'red' }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      ))}

                      <br />
                      {activeTab[activeTabId]}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <RequestDetails
                    requestDetails={requestDetails}
                    approvedRequestInfo={approvedRequestInfo}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
