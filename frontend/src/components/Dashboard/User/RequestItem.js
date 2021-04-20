import React from 'react';
import RequestInfo from './RequestInfo';

export default function RequestItem({ requestDetails }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  function getDate(date) {
    const currentdate = new Date(date);
    return `${currentdate.getDate()} ${
      monthNames[currentdate.getMonth()]
    }, ${currentdate.getFullYear()}`;
  }
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>{requestDetails.client.username}</h5>
          <p>Email: {requestDetails.client.email}</p>
          <div className="request-date">
            <strong>Request Date:</strong>
            <p> {getDate(requestDetails.createdAt)}</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p> {getDate(requestDetails.createdAt)}</p>
        </div>

        <RequestInfo requestDetails={requestDetails} />
      </div>
    </div>
  );
}
