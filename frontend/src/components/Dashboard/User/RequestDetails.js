import React from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function RequestDetails({
  requestDetails,
  approvedRequestInfo,
}) {
  let statusClassName = 'bg-danger';
  if (requestDetails.status === 'APPROVED') {
    statusClassName = 'bg-success';
  }

  function revokeRole() {
    const params = {
      requestId: requestDetails._id,
    };
    axiosInstance()
      .get('/user/assignRole/revoke', { params })
      .then((res) => {
        console.log(res);
        alert('Request has been revoked!');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong! Cannot revoke at this time');
        window.location.reload();
      });
  }

  return (
    <div>
      <strong>Status:{'  '}</strong>
      <span class={`badge text-light ${statusClassName}`}>
        {requestDetails.status}
      </span>
      <br />
      <strong> Request Details:</strong>
      {requestDetails.fieldsRequested.map((fieldsRequested) => (
        <div class="form-row mb-2">
          <div class="col">
            {fieldsRequested.fieldName}{' '}
            <small>({fieldsRequested.userDisplay})</small>
          </div>
        </div>
      ))}
      {requestDetails.typeOfRequest === 'role_assign' ? (
        <>
          {requestDetails.status !== 'REVOKED' && approvedRequestInfo !== '' ? (
            <>
              <strong>Role Assigned: </strong>
              {approvedRequestInfo.role.roleName}
            </>
          ) : null}
        </>
      ) : (
        <>
          <strong>Expiration Time:</strong>{' '}
          {approvedRequestInfo !== ''
            ? approvedRequestInfo.expiry.expireTime
            : null}
        </>
      )}
      <br />
      <br />
      {requestDetails.typeOfRequest === 'role_assign' &&
      requestDetails.status === 'APPROVED' ? (
        <>
          <button
            type="button"
            class="btn custom-btn3 bg-approve"
            style={{ marginRight: '20px' }}
            onClick={(e) => {
              e.preventDefault();
              revokeRole();
            }}
          >
            Revoke
          </button>
          <button type="button" class="btn custom-btn3 btn-dark">
            Close
          </button>
        </>
      ) : null}
    </div>
  );
}
