import React, { Component } from "react";

export class RequestItem extends Component {
  render() {
    return (
      <div class="col-xl-12 col-lg-12 col-md-12">
        <div class="request-item">
          <div class="request-info">
            <h5>John Doe</h5>
            <p>
              User ID: <em> xxxx1254 </em>
            </p>
            <div class="request-date">
              <strong>Request Date:</strong>
              <p> 9th February, 2021</p>
            </div>
          </div>
          <div class="request-date">
            <strong>Request Date:</strong>
            <p> 9th February, 2021</p>
          </div>

          <div class="btn-success request-status">
            <div class="col-xs-4 col-md-4 text-center pt-2 pb-2 bg-light-dark">
              <i class="fas fa-check"></i>
            </div>
            <div class="col-xs-8 col-md-8 pt-2 pb-2 text-center header">
              <h4>Verified</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestItem;
