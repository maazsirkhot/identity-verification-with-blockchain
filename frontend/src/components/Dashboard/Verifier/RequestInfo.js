import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import user from '../../../assets/img/default_user.png';
import axiosInstance from '../../../utils/axiosInstance';

export default function RequestInfo({ approvaldata, uniqueID }) {
  let approvalClassName = 'bg-danger';

  const [comments, setComments] = useState('');

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

  let images = [];

  images = [
    {
      original: approvaldata.docImage.front,
      thumbnail: approvaldata.docImage.front,
    },
    {
      original: approvaldata.docImage.back,
      thumbnail: approvaldata.docImage.back,
    },
  ];
  if (approvaldata.verifierApproval.status === 'APPROVED') {
    approvalClassName = 'bg-success';
  } else if (approvaldata.verifierApproval.status === 'PENDING') {
    approvalClassName = 'bg-warning';
  }

  function getDate(date) {
    const currentdate = new Date(date);
    return `${currentdate.getDate()} ${
      monthNames[currentdate.getMonth()]
    }, ${currentdate.getFullYear()}`;
  }

  function onApproval() {
    const data = {
      status: 'APPROVED',
      comments,
      verifiedBy: null,
    };
    approvaldata.verifierApproval = data;

    const userData = {
      userDetails: approvaldata,
    };
    axiosInstance()
      .post('/verifier/fetch/updateUserData', userData)
      .then((res) => {
        if (res.status === 200) {
          window.$(`request-info${uniqueID}`).modal('toggle');
          setTimeout(() => window.location.reload(), 500);
        }
      })
      .catch((err) => {
        alert('Something went wrong, please, please try again later');
        console.log(err.data);
      });
  }
  function onReject() {
    const data = {
      status: 'REJECTED',
      comments,
      verifiedBy: null,
    };
    approvaldata.verifierApproval = data;

    const userData = {
      userDetails: approvaldata,
    };
    axiosInstance()
      .post('/verifier/fetch/updateUserData', userData)
      .then((res) => {
        if (res.status === 200) {
          window.$(`request-info${uniqueID}`).modal('toggle');
          setTimeout(() => window.location.reload(), 500);
        }
      })
      .catch((err) => {
        alert('Something went wrong, please, please try again later');
        console.log(err.data);
      });
  }

  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#request-info${uniqueID}`}
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
      </button>
      <div
        className="modal modal-backdrop fade in"
        id={`request-info${uniqueID}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ minWidth: '750px' }}>
            <div className="theme-modal-header">
              <div className="title">
                <strong>USER DETAILS</strong>
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
            <div className="card-body approval-request-info">
              <div className="sub-grid">
                <div style={{ textAlign: 'center' }}>
                  <img src={user} alt="" height="175" class="img-responsive" />
                  <strong>{approvaldata.userEmail}</strong>
                </div>
                <br />
                {approvaldata && (
                  <div>
                    <p style={{ lineHeight: '40px' }}>
                      <strong>Status : </strong>

                      <span
                        class={`badge text-light ${approvalClassName}`}
                        style={{ fontSize: '16px' }}
                      >
                        {approvaldata.verifierApproval.status}
                      </span>

                      <br />
                      <strong>Request Date : </strong>
                      {getDate(approvaldata.createdAt)}
                      <br />

                      {approvaldata.verifierApproval.status !== 'PENDING' ? (
                        <>
                          <strong>Verification Date : </strong>
                          {getDate(approvaldata.updatedAt)}

                          <br />
                          <p>
                            <strong> Comments: </strong>
                            {approvaldata.verifierApproval.comments}
                          </p>
                        </>
                      ) : (
                        <form>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                          />
                          <button
                            type="button"
                            class="custom-btn2 bg-approve"
                            style={{ marginRight: '20px' }}
                            onClick={onApproval}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            class="custom-btn2 bg-decline"
                            onClick={onReject}
                          >
                            Decline
                          </button>
                        </form>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div style={{ paddingLeft: '30px' }}>
                <p style={{ lineHeight: '30px' }}>
                  {approvaldata &&
                    approvaldata.dataField.map((field) => (
                      <>
                        <strong>{field.field_name} : </strong>
                        {field.field_value}
                        <br />
                      </>
                    ))}
                </p>

                <ImageGallery items={images} showPlayButton={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
