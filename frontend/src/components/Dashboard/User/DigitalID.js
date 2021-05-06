import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DOCUMENT_TYPE } from '../../../actions/types';
import EditDocument from '../../Verification/EditDocument';
import fingerprint from '../../../assets/img/fingerprint.png';

export default function DigitalID({ userDetails }) {
  const [statusClass, setStatusClass] = useState('reject');
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDetails.verifierApproval.status === 'APPROVED') {
      setStatusClass('success');
    } else if (userDetails.verifierApproval.status === 'PENDING') {
      setStatusClass('pending');
    }
  }, []);

  function onClick() {
    dispatch({
      type: DOCUMENT_TYPE,
      payload: userDetails.idType,
    });
  }

  return (
    <div className="col-xl-10 col-lg-12 col-md-12">
      <div className="digitalid-card">
        <div className="digitalid-info">
          <img src={fingerprint} width="72" height="80" alt="digital-id" />
          <h6>
            Driver&apos;s License
            <br />
            {userDetails.verifierApproval.status === 'APPROVED' ? (
              <>
                <p style={{ fontSize: '10px', marginTop: '5px' }}>
                  <strong>Wallet ID:</strong>
                  <br /> {userDetails.dataReference}
                </p>
              </>
            ) : null}
          </h6>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row' }}
          onClick={onClick}
          aria-hidden
        >
          <EditDocument />

          <span className={`digitalid-status ${statusClass}`}>
            {userDetails.verifierApproval.status}
          </span>
        </div>
      </div>
    </div>
  );
}
