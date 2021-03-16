import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CURRENT_APPROVAL_ITEM } from '../../../actions/types';

export default function RequestItems({ userdata }) {
  const id = userdata.userId;
  const dispatch = useDispatch();
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
    const currentdate = new Date(userdata.createdAt);
    setDate(
      `${currentdate.getDate()} ${
        monthNames[currentdate.getMonth()]
      }, ${currentdate.getFullYear()}`
    );
  });
  function onClick() {
    dispatch({
      type: CURRENT_APPROVAL_ITEM,
      payload: userdata,
    });
  }
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>{userdata.userEmail}</h5>

          <div className="request-date">
            <strong>Request Date:</strong>
            <p>{date}</p>
          </div>
        </div>
        <div className="request-date">
          <strong>Request Date:</strong>
          <p>{date}</p>
        </div>

        <Link
          to={`/verifier/requestinfo/${id}`}
          className="btn-more-info request-status"
          onClick={onClick}
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
        </Link>
      </div>
    </div>
  );
}
