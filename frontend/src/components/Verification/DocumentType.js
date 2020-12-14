import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Header/NavBar";
import DocumentBanner from "./DocumentBanner";
import passport from "./passport.png";
import license from "./drivers-license.png";
import identitycard from "./identitycard.png";
import "./Document.css";

export class DocumentType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/documentfiles" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <DocumentBanner />
        <form onSubmit={this.onSubmit}>
          <section className="document-main">
            <div className="container form-container">
              <div class="form-group">
                <p className="form-label">Document Country</p>
                <select class="form-control" name="country" required>
                  <option defaultValue value="">
                    Please select a country
                  </option>
                  <option value="USA">United States of America</option>
                </select>
              </div>
              <p className="form-label">Identification Type</p>
              <div class="form-group document-type-radio-group">
                <label>
                  <input type="radio" name="documenttype" />
                  <div className="radio-background">
                    <img src={license} alt="" width="85" height="70" />
                    <br />
                    Driver's license
                  </div>
                </label>

                <label>
                  <input type="radio" name="documenttype" />
                  <div className="radio-background">
                    <img src={passport} alt="" width="65" height="75" />
                    <br />
                    Passport
                  </div>
                </label>
                <label>
                  <input type="radio" name="documenttype" />
                  <div className="radio-background">
                    <img src={identitycard} alt="" width="85" height="70" />
                    <br />
                    Identity Card
                  </div>
                </label>
              </div>
            </div>
          </section>
          <div className="container">
            <button
              type="submit"
              class="submit custom-btn1"
              onClick={() => {
                this.setState({ redirect: true });
              }}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentType;
