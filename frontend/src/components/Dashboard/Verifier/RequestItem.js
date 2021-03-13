import React from 'react';

export default function RequestItems({ userdata }) {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>{userdata.userEmail}</h5>

          <div className="request-date">
            <strong>Request Date:</strong>
            <p> 9th February, 2021</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p> 9th February, 2021</p>
        </div>

        <button type="button" className="btn-more-info request-status">
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
      </div>
    </div>
  );
}
