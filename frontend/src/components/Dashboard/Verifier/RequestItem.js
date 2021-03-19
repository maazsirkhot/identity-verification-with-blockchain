import React, { useEffect, useState } from 'react';

import RequestInfo from './RequestInfo';

export default function RequestItems({ userdata }) {
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
  let statusClassName = 'bg-danger';
  if (userdata.verifierApproval.status === 'APPROVED') {
    statusClassName = 'bg-success';
  } else if (userdata.verifierApproval.status === 'PENDING') {
    statusClassName = 'bg-warning';
  }

  useEffect(() => {
    const currentdate = new Date(userdata.createdAt);
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
          <h5>{userdata.userEmail}</h5>
          <div style={{ fontSize: '14px' }}>
            <strong>Status:{'  '}</strong>
            <span class={`badge text-light ${statusClassName}`}>
              {userdata.verifierApproval.status}
            </span>
          </div>
          <br />
          <div className="request-date">
            <strong>Request Date:</strong>
            <p>{date}</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p>{date}</p>
        </div>

        <RequestInfo approvaldata={userdata} uniqueID={userdata.userId} />
      </div>
    </div>
  );
}
