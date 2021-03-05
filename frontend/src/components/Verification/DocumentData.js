import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import logo from '../../assets/img/logo_v2.png';
import { RESET_UPLOAD_STATE } from '../../actions/types';

export default function DocumentData(props) {
  const dispatch = useDispatch();
  const [relevantText, setUpdatedText] = useState(
    useSelector((state) => state.uploads.relevantText)
  );

  const type = useSelector((state) => state.uploads.documenttype);
  const frontImage = useSelector((state) => state.uploads.frontimage);
  const backImage = useSelector((state) => state.uploads.backimage);

  function onChange(e) {
    const updatedText = [...relevantText];
    updatedText[e.target.id] = {
      ...updatedText[e.target.id],
      field_value: e.target.value,
    };
    setUpdatedText(updatedText);
  }

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('documents', frontImage);
    formData.append('documents', backImage);
    formData.append('idType', type);
    formData.append('relevantText', JSON.stringify(relevantText));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/textract/storeUserDetails', formData, config)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          dispatch({
            type: RESET_UPLOAD_STATE,
          });
          window.location.reload(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
  return (
    <div class="tab-pane fade show active document-upload-about">
      <div class="theme-modal-header">
        <div className="title">
          <img src={logo} alt="logo" width="100" />
          <br />
          <span
            class="back-btn"
            onClick={props.activeTabChange.bind(this, '2')}
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

      <div class="modal-body">
        <form onSubmit={onSubmit}>
          {relevantText.map((field, index) => {
            return (
              <div class="form-group">
                <label for="exampleInputEmail1"> {field.field_name}</label>
                <input
                  type="text"
                  class="form-control"
                  value={field.field_value}
                  id={index}
                  key={field.field_id}
                  onChange={onChange}
                />
              </div>
            );
          })}
          <button class="next-btn" type="submit">
            Submit for verification
          </button>
        </form>
      </div>
    </div>
  );
}
