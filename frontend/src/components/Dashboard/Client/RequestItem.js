import React, { useEffect, useState } from 'react';

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

  const [date, setDate] = useState(' ');
  useEffect(() => {
    const currentdate = new Date(requestDetails.createdAt);
    setDate(
      `${currentdate.getDate()} ${
        monthNames[currentdate.getMonth()]
      }, ${currentdate.getFullYear()}`
    );
  });

  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>{requestDetails.user.username}</h5>
          <p>
            User email:
            <em> {requestDetails.user.email} </em>
          </p>
          <div className="request-date">
            <strong>Request Date:</strong>
            <p> {date}</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p> {date}</p>
        </div>

        <div className="btn-success request-status">
          <div className="col-xs-4 col-md-4 text-center pt-2 pb-2 bg-light-dark">
            <i className="fas fa-check" />
          </div>
          <div className="col-xs-8 col-md-8 pt-2 pb-2 text-center header">
            <h4>{requestDetails.status}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
