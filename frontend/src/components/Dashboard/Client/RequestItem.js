import React from 'react';

export default function RequestItem() {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>John Doe</h5>
          <p>
            User ID:
            <em> xxxx1254 </em>
          </p>
          <div className="request-date">
            <strong>Request Date:</strong>
            <p> 9th February, 2021</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p> 9th February, 2021</p>
        </div>

        <div className="btn-success request-status">
          <div className="col-xs-4 col-md-4 text-center pt-2 pb-2 bg-light-dark">
            <i className="fas fa-check" />
          </div>
          <div className="col-xs-8 col-md-8 pt-2 pb-2 text-center header">
            <h4>Verified</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
