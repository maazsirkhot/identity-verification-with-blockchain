import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import logo from '../../assets/img/logo_v2.png';
import { RESET_UPLOAD_STATE } from '../../actions/types';

export default function DocumentData({ activeTabChange }) {
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
    <div className="tab-pane fade show active document-upload-about">
      <div className="theme-modal-header">
        <div className="title">
          <img src={logo} alt="logo" width="100" />
          <br />
          <span
            aria-hidden="true"
            className="back-btn"
            onClick={activeTabChange.bind(this, '2')}
          >
            <i className="fas fa-arrow-left" />
          </span>
          <i className="fas fa-lock" />
          Secure Identity Verifcation
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
        <form onSubmit={onSubmit}>
          {relevantText.map((field, index) => (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">{field.field_name}</label>
              <input
                type="text"
                className="form-control"
                value={field.field_value}
                id={index}
                key={field.field_id}
                onChange={onChange}
              />
            </div>
          ))}
          <button className="next-btn" type="submit">
            Submit for verification
          </button>
        </form>
      </div>
    </div>
  );
}
