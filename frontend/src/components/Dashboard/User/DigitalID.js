import React, { Component } from "react";
import fingerprint from "../../../assets/img/fingerprint.png";
export class DigitalID extends Component {
  render() {
    return (
      <div class="col-xl-10 col-lg-12 col-md-12">
        <div class="digitalid-card">
          <div class="digitalid-info">
            <img src={fingerprint} width="72" height="80" alt="digital-id" />
            <h6>Driver's License</h6>
          </div>
          <span class="digitalid-status success">Verified</span>
        </div>
      </div>
    );
  }
}

export default DigitalID;
