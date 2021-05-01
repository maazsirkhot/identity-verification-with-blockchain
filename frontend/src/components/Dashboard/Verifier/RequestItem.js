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
  if (userdata.verifierApproval[0].status === 'APPROVED') {
    statusClassName = 'bg-success';
  } else if (userdata.verifierApproval[0].status === 'PENDING') {
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
    <tr className="request-item">
      <td className="request-info">
        <h5>{userdata.userEmail}</h5>
        <div style={{ fontSize: '14px' }}>
          <strong>Status:{'  '}</strong>
          <span class={`badge text-light ${statusClassName}`}>
            {userdata.verifierApproval[0].status}
          </span>
        </div>
        <br />
        <div className="request-date">
          <strong>Request Date:</strong>
          <p>{date}</p>
        </div>
      </td>
      <td className="request-date">
        <strong>Request Date:</strong>
        <p>{date}</p>
      </td>

      <RequestInfo approvaldata={userdata} uniqueID={userdata.userId} />
    </tr>
  );
}
