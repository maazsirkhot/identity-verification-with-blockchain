import React, { Component } from "react";
import DocumentBanner from "./DocumentBanner";
import axios from "axios";

export class DocumentFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImage: "",
      backImage: "",
    };
  }
  onFrontImageChange = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({
      frontImage: file,
    });

    var img = document.querySelector("#file-upload-area1 img");
    var reader = new FileReader();
    reader.onloadend = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    document.querySelector("#file-upload-area1 p").hidden = true;
    document.getElementById("file-upload-area1").classList.add("no-border");
    img.hidden = false;
  };
  onBackImageChange = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({
      backImage: file,
    });

    var img = document.querySelector("#file-upload-area2 img");
    var reader = new FileReader();
    reader.onloadend = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    document.querySelector("#file-upload-area2 p").hidden = true;
    document.getElementById("file-upload-area2").classList.add("no-border");
    img.hidden = false;
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.frontImage === "" || this.state.backImage === "") {
      alert("Please upload both the images");
    }
    const formData = new FormData();
    formData.append("document", this.state.frontImage);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(
      " http://localhost:5000/fetchUserDetailsFromId",
      formData,
      config
    );
  };
  render() {
    return (
      <div>
        <DocumentBanner />
        <form onSubmit={this.onSubmit}>
          <section className="document-main">
            <div className="container form-container2">
              <div class="form-group document-files">
                <input
                  type="file"
                  name="frontImage"
                  id="frontImage"
                  onChange={this.onFrontImageChange}
                  style={{ display: "None" }}
                  accept="image/jpeg, image/png"
                />
                <div
                  class="file-upload-area"
                  id="file-upload-area1"
                  onClick={() => {
                    document.getElementById("frontImage").click();
                  }}
                >
                  <p>Click to upload front side of the document</p>
                  <img hidden src="" alt="" class="img-fluid"></img>
                </div>
                <input
                  type="file"
                  name="backImage"
                  id="backImage"
                  onChange={this.onBackImageChange}
                  style={{ display: "None" }}
                  accept="image/jpeg, image/png"
                />
                <div
                  class="file-upload-area"
                  id="file-upload-area2"
                  onClick={() => {
                    document.getElementById("backImage").click();
                  }}
                >
                  <p>Click to upload back side of the document</p>
                  <img hidden src="" alt="" class="img-fluid"></img>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <button type="submit" class="submit custom-btn1">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentFiles;
