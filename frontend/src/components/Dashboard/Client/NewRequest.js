import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function NewRequest({ uniqueID, userDetails, infoFields }) {
  const [fieldsRequested, setFields] = useState([
    {
      fieldId: null,
      fieldName: '',
      isAbstracted: false,
      abstractionParam: '',
      userDisplay: '',
    },
  ]);

  const [customRequests, setCustomRequests] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState('');
  const [comment, setComment] = useState('');
  function onLoad() {
    axiosInstance()
      .get('/client/customRequest')
      .then((res) => {
        setCustomRequests(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }

  function onSelectedRequestChange(event) {
    setSelectedRequest(event.target.value);

    const values = [];
    const selected = customRequests.filter(
      (request) => request._id === event.target.value
    );

    selected[0].fieldsAdded.map((field) =>
      values.push({
        fieldId: field.fieldId,
        fieldName: field.fieldName,
        isAbstracted: field.isAbstracted,
        abstractionParam: field.abstractionParam,
        userDisplay: field.userDisplay,
      })
    );

    setFields(values);
  }
  function handleChange(i, event) {
    const values = [...fieldsRequested];
    values[i].fieldName = event.target.value;
    values[i].fieldId = event.target[event.target.selectedIndex].id;
    setFields(values);
  }
  function handleMethodChange(i, event) {
    const values = [...fieldsRequested];

    if (event.target.value !== 'complete information') {
      values[i].isAbstracted = true;
    }

    values[i].abstractionParam = event.target.value;
    values[i].userDisplay = event.target.options[
      event.target.options.selectedIndex
    ].getAttribute('userDisplay');
    setFields(values);
  }

  function getMethodName(fieldName) {
    const method = infoFields
      .filter((field) => field.fieldName === fieldName)
      .map((selectedField) => selectedField.abstractionTypes);
    return method[0].map((methodName) => (
      <option value={methodName.apiParam} userDisplay={methodName.userDisplay}>
        {methodName.userDisplay}
      </option>
    ));
  }
  function handleAdd() {
    const values = [...fieldsRequested];
    values.push({
      fieldId: null,
      fieldName: '',
      isAbstracted: false,
      abstractionParam: '',
      userDisplay: '',
    });
    setFields(values);
  }

  function handleRemove(i) {
    if (fieldsRequested.length > 1) {
      const values = [...fieldsRequested];
      values.splice(i, 1);
      setFields(values);
    }
  }

  function reset() {
    setFields([
      {
        fieldId: null,
        fieldName: '',
        isAbstracted: false,
        abstractionParam: '',
        userDisplay: '',
      },
    ]);
    window.$('#infoField-0').prop('selectedIndex', 0);
    window.$(`#new-request${uniqueID}`).modal('toggle');
  }

  function onSubmit(e) {
    e.preventDefault();
    let data = {
      user: {
        userId: userDetails.userId,
        username: userDetails.username,
        email: userDetails.email,
      },
      fieldsRequested,
      comment,
    };
    if (comment === '') {
      data = {
        user: {
          userId: userDetails.userId,
          username: userDetails.username,
          email: userDetails.email,
        },
        fieldsRequested,
      };
    }

    axiosInstance()
      .post('/client/request', data)
      .then((res) => {
        if (res.status === 201 && res.data.dataAvailable) {
          alert(res.data.message);
          reset();
        }
      })
      .catch((err) => {
        console.log('Caught in error', err);
        alert('Something went wrong, please try again later!');
      });
  }

  return (
    <div>
      <button
        type="button"
        className="btn-more-info request-status"
        data-toggle="modal"
        data-target={`#new-request${uniqueID}`}
        onClick={onLoad}
      >
        <div className="col-1 text-center pt-2 pb-2 bg-light-dark">
          <i class="fas fa-user-plus" />
        </div>
        <div
          className="col-15 pt-2 pb-2 text-center header"
          style={{ minWidth: '82px' }}
        >
          <h4>New Request</h4>
        </div>
      </button>
      <div
        className="modal modal-backdrop fade in"
        id={`new-request${uniqueID}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="theme-modal-header">
              <div className="title">
                <strong>NEW REQUEST</strong>
              </div>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={reset}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="card-body ">
              <form onSubmit={onSubmit}>
                Send to: <strong> {userDetails.username} </strong>
                <br />
                <br />
                <div class="form-group">
                  <label htmlFor="selectCustomRequest">
                    <strong>Select a custom request</strong>
                  </label>
                  <select
                    class="form-control"
                    onChange={onSelectedRequestChange}
                    value={selectedRequest}
                  >
                    <option value="" defaultValue>
                      Custom Request
                    </option>
                    {customRequests.length > 0 &&
                      customRequests.map((request) => (
                        <option value={request._id}>{request.name}</option>
                      ))}
                  </select>
                </div>
                <h4 className="or-break">OR</h4>
                <br />
                <strong>Information Needed:</strong>
                <br />
                <br />
                {fieldsRequested.map((field, idx) => (
                  <div class="form-row mb-2">
                    <div key={`infoField-${idx}`} class="col">
                      <select
                        class="form-control"
                        onChange={(e) => handleChange(idx, e)}
                        value={field.fieldName}
                        required
                        id={`infoField-${idx}`}
                      >
                        <option defaultValue value="" selected>
                          Information
                        </option>
                        {infoFields.map((infofield) => (
                          <option
                            id={infofield._id}
                            value={infofield.fieldName}
                          >
                            {infofield.fieldName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div key={`infoFieldMethod-${idx}`} class="col">
                      <select
                        class="form-control"
                        name={`infoFieldMethod-${idx}`}
                        value={field.abstractionParam}
                        onChange={(e) => handleMethodChange(idx, e)}
                        required
                      >
                        <option defaultValue value="">
                          Information Level
                        </option>
                        {field.fieldName !== ''
                          ? getMethodName(field.fieldName)
                          : null}
                      </select>
                    </div>
                    <div
                      class="col-1"
                      style={{ paddingTop: '7px' }}
                      aria-hidden
                      onClick={() => handleRemove(idx)}
                    >
                      <i class="fas fa-minus-circle" />
                    </div>
                    <div
                      class="col-1"
                      style={{ paddingTop: '7px' }}
                      aria-hidden
                      onClick={handleAdd}
                    >
                      <i class="fas fa-plus" />
                    </div>
                  </div>
                ))}
                <br />
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Comments"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  class="btn custom-btn3 bg-approve"
                  style={{ marginRight: '20px' }}
                >
                  Send
                </button>
                <button
                  type="button"
                  class="btn custom-btn3 bg-decline"
                  onClick={reset}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
