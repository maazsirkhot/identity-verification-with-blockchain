import React, { useState } from 'react';
import logo from '../../../assets/img/logo_v2.png';
import AssignRequest from './AssignRequest';
import AssignRole from './AssignRole';

export default function RequestInfo({ requestDetails }) {
  const [activeTabId, setactiveTabId] = useState(0);
  const activeTab = [
    <AssignRequest requestId={requestDetails._id} />,
    <AssignRole
      requestId={requestDetails._id}
      client={requestDetails.client}
    />,
  ];

  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#request-info${requestDetails._id}`}
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
        <div className="modal-dialog" role="document">
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
                    {requestDetails.client.username} is requesting the following
                    information
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
                        <i
                          class="far fa-check-circle"
                          style={{ color: 'green' }}
                        />
                      </div>
                    </div>
                  ))}

                  <br />
                  {activeTab[activeTabId]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
