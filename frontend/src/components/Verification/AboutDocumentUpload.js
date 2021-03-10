import React from 'react';
import logo from '../../assets/img/logo_v2.png';

export default function AboutDocumentUpload({ activeTabChange }) {
  return (
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

      <div className="modal-body">
        <ul>
          <li>
            <i className="fas fa-lock" /> Verify has built a world-class
            identity verification, that handles your data securely.
          </li>
          <li>
            <i className="fas fa-shield-alt" />
            Your information is used for verification purposes and won’t be used
            for third-party marketing.
          </li>
          <li>
            <i className="fas fa-clock" /> This process should take less than 5
            minutes.
          </li>
        </ul>
        <button
          type="button"
          className="next-btn"
          onClick={activeTabChange.bind(this, '1')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
