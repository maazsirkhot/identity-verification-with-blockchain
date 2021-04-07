import React from 'react';
import RequestInfo from './RequestInfo';

export default function RequestItem() {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>John Doe</h5>
          <p>Organization: Organization Name</p>
          <div className="request-date">
            <strong>Request Date:</strong>
            <p> 9th February, 2021</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p> 9th February, 2021</p>
        </div>

        <RequestInfo />
      </div>
    </div>
  );
}
