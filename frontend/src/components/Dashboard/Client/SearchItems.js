import React from 'react';
import NewRequest from './NewRequest';

export default function SearchItems({ userDetails, infoFields }) {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="request-item">
        <div className="request-info">
          <h5>{userDetails.username}</h5>
          <p>
            User email:
            <em> {userDetails.email} </em>
          </p>
        </div>
        <NewRequest
          uniqueID={userDetails.userId}
          userDetails={userDetails}
          infoFields={infoFields}
        />
      </div>
    </div>
  );
}
