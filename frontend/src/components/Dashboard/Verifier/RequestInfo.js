import React from 'react';
import ImageGallery from 'react-image-gallery';
import user from '../../../assets/img/default_user.png';

export default function RequestInfo({ approvaldata, uniqueID }) {
  let approvalClassName = 'bg-danger';

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

  let size = 0;

  size = approvaldata.dataField.length;

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

  function getDate() {
    const currentdate = new Date(approvaldata.createdAt);
    return `${currentdate.getDate()} ${
      monthNames[currentdate.getMonth()]
    }, ${currentdate.getFullYear()}`;
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
                      {getDate()}
                      <br />
                      <strong>Verification Date : </strong>
                      <br />
                      {approvaldata.verifierApproval.status === 'APPROVED' ? (
                        <p>
                          <strong> Comments: </strong>
                          {approvaldata.verifierApproval.comments}
                        </p>
                      ) : (
                        <form>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Comments"
                          />
                          <button
                            type="button"
                            class="custom-btn2 bg-approve"
                            style={{ marginRight: '20px' }}
                          >
                            Approve
                          </button>
                          <button type="button" class="custom-btn2 bg-decline">
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
                    approvaldata.dataField
                      .filter((field, index) => index < size - 2)
                      .map((field) => (
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
