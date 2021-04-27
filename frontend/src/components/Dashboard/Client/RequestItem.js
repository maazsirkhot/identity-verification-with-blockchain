import React, { useEffect, useState } from 'react';
import logo from '../../../assets/img/logo_v2.png';
import axiosInstance from '../../../utils/axiosInstance';

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
  const [statusClass, setStatusClass] = useState('reject');
  const [statusIcon, setStatusIcon] = useState('fas fa-user-times');
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const currentdate = new Date(requestDetails.createdAt);
    setDate(
      `${currentdate.getDate()} ${
        monthNames[currentdate.getMonth()]
      }, ${currentdate.getFullYear()}`
    );

    if (requestDetails.status === 'PENDING') {
      setStatusClass('pending');
      setStatusIcon('fas fa-history');
    } else if (requestDetails.status === 'APPROVED') {
      setStatusClass('success');
      setStatusIcon('fas fa-check');
    }
  });

  function onClick() {
    const params = {
      requestId: requestDetails._id,
    };
    if (requestDetails.typeOfRequest === 'role_assign') {
      axiosInstance()
        .get('/user/assignRole', { params })
        .then((res) => {
          if (res.data.data.length > 0)
            setUserDetails(res.data.data[0].userDataFields);
          else setUserDetails([]);
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong! Please try again later');
        });
    } else {
      axiosInstance()
        .get(`/client/fetch/post/${requestDetails._id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.data.length > 0)
            setUserDetails(res.data.data[0].userDataFields);
          else setUserDetails([]);
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong! Please try again later');
        });
    }
  }
  function getUserDetails() {
    if (userDetails.length > 0) {
      return userDetails.map((fieldsRequested) => (
        <>
          {fieldsRequested.field_name}: {fieldsRequested.field_value}
          <br />
        </>
      ));
    }
    return null;
  }
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

        {requestDetails.status === 'APPROVED' ? (
          <button
            className={`digitalid-status request-status ${statusClass}`}
            data-toggle="modal"
            data-target={`#request-information${requestDetails._id}`}
            type="button"
            onClick={onClick}
          >
            <div className="col-xs-4 col-md-4 text-center pt-2 pb-2 bg-light-dark">
              <i className={statusIcon} />
            </div>
            <div className="col-xs-8 col-md-8 pt-2 pb-2 text-center header">
              <h4>{requestDetails.status}</h4>
            </div>
          </button>
        ) : (
          <button
            className={`digitalid-status request-status ${statusClass}`}
            type="button"
          >
            <div className="col-xs-4 col-md-4 text-center pt-2 pb-2 bg-light-dark">
              <i className={statusIcon} />
            </div>
            <div className="col-xs-8 col-md-8 pt-2 pb-2 text-center header">
              <h4>{requestDetails.status}</h4>
            </div>
          </button>
        )}

        <div
          className="modal modal-backdrop fade in"
          id={`request-information${requestDetails._id}`}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="tab-pane fade show active document-upload-about">
                <div className="theme-modal-header">
                  <div className="title">
                    <img src={logo} alt="logo" width="100" />
                    <br />
                    <i className="fas fa-lock" /> Secure Identity Verifcation
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
              </div>
              <div className="modal-body">
                {requestDetails.status === 'PENDING' ? (
                  'User is yet to approve the request'
                ) : (
                  <>
                    <h5 style={{ textAlign: 'center' }}>
                      <strong>Information Requested</strong>
                    </h5>
                    <p>{getUserDetails()}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
