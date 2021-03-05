import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  DOCUMENT_FRONT_IMAGE,
  DOCUMENT_BACK_IMAGE,
  TEXTRACT_TEXT,
} from '../../actions/types';
import logo from '../../assets/img/logo_v2.png';

export default function DocumentPictures(props) {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.uploads.documenttype);
  const frontImage = useSelector((state) => state.uploads.frontimage);
  const backImage = useSelector((state) => state.uploads.backimage);
  function onFrontImageChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    dispatch({
      type: DOCUMENT_FRONT_IMAGE,
      payload: file,
    });

    var img = document.querySelector('#file-upload-area1 img');
    var reader = new FileReader();
    reader.onloadend = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    document.querySelector('#file-upload-area1 p').hidden = true;
    document.getElementById('file-upload-area1').classList.add('no-border');
    img.hidden = false;
  }

  function onBackImageChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    dispatch({
      type: DOCUMENT_BACK_IMAGE,
      payload: file,
    });

    var img = document.querySelector('#file-upload-area2 img');
    var reader = new FileReader();
    reader.onloadend = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    document.querySelector('#file-upload-area2 p').hidden = true;
    document.getElementById('file-upload-area2').classList.add('no-border');
    img.hidden = false;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (frontImage === '' || backImage === '') {
      alert('Please upload both the images');
    } else {
      const formData = new FormData();

      formData.append('documents', frontImage);
      formData.append('documents', backImage);
      formData.append('idType', type);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios
        .post('/textract/getUserDetails', formData, config)
        .then((response) => {
          if (response.status === 200) {
            console.log('In here', response.data.relevantText);
            dispatch({
              type: TEXTRACT_TEXT,
              payload: response.data.relevantText,
            });
            props.activeTabChange('3');
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }
  return (
    <div class="tab-pane fade show active" role="tabpanel">
      <div class="theme-modal-header">
        <div className="title">
          <img src={logo} alt="logo" width="100" />
          <br />
          <span
            class="back-btn"
            onClick={props.activeTabChange.bind(this, '1')}
          >
            <i class="fas fa-arrow-left"></i>
          </span>
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
      <div class="modal-body ">
        <form onSubmit={onSubmit}>
          <div class="form-group document-pictures">
            <input
              type="file"
              name="frontImage"
              id="frontImage"
              onChange={onFrontImageChange}
              style={{ display: 'None' }}
              accept="image/jpeg, image/png"
            />
            <div
              class="file-upload-area"
              id="file-upload-area1"
              onClick={() => {
                document.getElementById('frontImage').click();
              }}
            >
              <p>Click to upload front side of the document</p>
              <img hidden src="" alt="" class="img-fluid"></img>
            </div>
            <input
              type="file"
              name="backImage"
              id="backImage"
              onChange={onBackImageChange}
              style={{ display: 'None' }}
              accept="image/jpeg, image/png"
            />
            <div
              class="file-upload-area"
              id="file-upload-area2"
              onClick={() => {
                document.getElementById('backImage').click();
              }}
            >
              <p>Click to upload back side of the document</p>
              <img hidden src="" alt="" class="img-fluid"></img>
            </div>
          </div>

          <button type="submit" class="next-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
