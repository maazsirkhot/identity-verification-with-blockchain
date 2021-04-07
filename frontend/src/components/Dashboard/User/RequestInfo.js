import React from 'react';
import logo from '../../../assets/img/logo_v2.png';

export default function RequestInfo({ uniqueID }) {
  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#request-info${uniqueID}`}
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
        id={`request-info${uniqueID}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ minWidth: '750px' }}>
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
              <p style={{ textAlign: 'center' }}>
                John Doe is requesting the following information
              </p>
              <form style={{ padding: '0 25px' }}>
                <div class="form-row mb-2">
                  <div class="col">
                    First Name
                    <br />
                    <small>(complete information)</small>
                    <br />
                  </div>
                  <div class="col">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Choose Document</option>
                      <option>DL</option>
                      <option>Passport</option>
                    </select>
                  </div>
                </div>

                <div class="form-row mb-2">
                  <div class="col">
                    Last Name
                    <br />
                    <small>(complete information)</small>
                    <br />
                  </div>
                  <div class="col">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Choose Document</option>
                      <option>DL</option>
                      <option>Passport</option>
                    </select>
                  </div>
                </div>
                <div class="form-row mb-2">
                  <div class="col">
                    Passport Expiry Date
                    <br />
                    <small>(above 6 months)</small>
                    <br />
                  </div>
                  <div class="col">
                    <p>Information not available</p>
                  </div>
                </div>
                <br />

                <div class="form-row mb-2">
                  <div class="col">
                    <strong>Access Expires in:</strong>
                  </div>
                  <div class="col">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Never</option>
                      <option>1 hour</option>
                      <option>1 day</option>
                      <option>1 week</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
                <button
                  type="submit"
                  class="btn custom-btn3 bg-approve"
                  style={{ marginRight: '20px' }}
                >
                  Approve
                </button>
                <button type="button" class="btn custom-btn3 bg-decline">
                  Reject
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
