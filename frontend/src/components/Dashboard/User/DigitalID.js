import React, { useEffect, useState } from 'react';
import fingerprint from '../../../assets/img/fingerprint.png';

export default function DigitalID({ userDetails }) {
  const [statusClass, setStatusClass] = useState('reject');
  useEffect(() => {
    if (userDetails.verifierApproval.status === 'APPROVED') {
      setStatusClass('success');
    } else if (userDetails.verifierApproval.status === 'PENDING') {
      setStatusClass('pending');
    }
  }, []);

  return (
    <div className="col-xl-10 col-lg-12 col-md-12">
      <div className="digitalid-card">
        <div className="digitalid-info">
          <img src={fingerprint} width="72" height="80" alt="digital-id" />
          <h6>Driver&apos;s License</h6>
        </div>
        <span className={`digitalid-status ${statusClass}`}>
          {userDetails.verifierApproval.status}
        </span>
      </div>
    </div>
  );
}
