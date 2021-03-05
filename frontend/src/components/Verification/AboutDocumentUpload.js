import React from 'react';
import logo from '../../assets/img/logo_v2.png';

export default function AboutDocumentUpload(props) {
  return (
    <div class="tab-pane fade show active document-upload-about">
      <div class="theme-modal-header">
        <div className="title">
          <img src={logo} alt="logo" width="100" />
          <br />
          <i class="fas fa-lock"></i> Secure Identity Verifcation
        </div>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <ul>
          <li>
            <i class="fas fa-lock"></i> Verify has built a world-class identity
            verification, that handles your data securely.
          </li>
          <li>
            <i class="fas fa-shield-alt"></i>
            Your information is used for verification purposes and won’t be used
            for third-party marketing.
          </li>
          <li>
            <i class="fas fa-clock"></i> This process should take less than 5
            minutes.
          </li>
        </ul>
        <button
          class="next-btn"
          onClick={props.activeTabChange.bind(this, '1')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
