import React from 'react';
import fingerprint from '../../../assets/img/fingerprint.png';

export default function DigitalID() {
  return (
    <div className="col-xl-10 col-lg-12 col-md-12">
      <div className="digitalid-card">
        <div className="digitalid-info">
          <img src={fingerprint} width="72" height="80" alt="digital-id" />
          <h6>Driver&apos;s License</h6>
        </div>
        <span className="digitalid-status success">Verified</span>
      </div>
    </div>
  );
}
