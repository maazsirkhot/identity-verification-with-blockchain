import React from 'react';

export default function NewRequest({ uniqueID, userDetails }) {
  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#new-request${uniqueID}`}
      >
        <div className="col-1 text-center pt-2 pb-2 bg-light-dark">
          <i class="fas fa-user-plus" />
        </div>
        <div
          className="col-15 pt-2 pb-2 text-center header"
          style={{ minWidth: '82px' }}
        >
          <h4>New Request</h4>
        </div>
      </button>
      <div
        className="modal modal-backdrop fade in"
        id={`new-request${uniqueID}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="theme-modal-header">
              <div className="title">
                <strong>NEW REQUEST</strong>
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
              Send to: <strong> {userDetails.username} </strong>
              <br />
              <br />
              <strong>Information Needed:</strong>
              <br />
              <br />
              <form>
                <div class="form-row">
                  <div class="col">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option selected>Information</option>
                      <option>First Name</option>
                      <option>Last Name</option>
                      <option>Age</option>
                      <option>DL Number</option>
                      <option>DL Issue State</option>
                      <option>Address</option>
                    </select>
                  </div>
                  <div class="col">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option selected>Information Level</option>
                      <option>Complete Information</option>
                      <option>Above 18+</option>
                      <option>Current State</option>
                    </select>
                  </div>
                  <div class="col-1" style={{ paddingTop: '7px' }}>
                    <i class="fas fa-plus" />
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Comments"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-info"
                  style={{ marginRight: '20px' }}
                >
                  Send
                </button>
                <button type="button" class="btn btn-dark">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
