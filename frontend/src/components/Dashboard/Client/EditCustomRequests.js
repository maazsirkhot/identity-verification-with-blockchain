import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function EditCustomRequests({ customrequest }) {
  const [fieldsRequested, setFields] = useState([
    {
      fieldId: null,
      fieldName: '',
      isAbstracted: '',
      abstractionParams: [],
    },
  ]);

  const [customrequestname, setRequestName] = useState('');

  const [infoFields, setInfoFields] = useState([]);
  function onLoad() {
    axiosInstance()
      .get('/system/infoFields')
      .then((res) => {
        setInfoFields(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
    setRequestName(customrequest.name);
    const values = [];

    customrequest.fieldsAdded.map((field) =>
      values.push({
        fieldId: field.fieldId,
        fieldName: field.fieldName,
        isAbstracted: field.isAbstracted,
        abstractionParams: field.abstractionParams,
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
    values[i].isAbstracted = event.target.value;
    setFields(values);
  }

  function getMethodName(fieldName) {
    const method = infoFields
      .filter((field) => field.fieldName === fieldName)
      .map((selectedField) => selectedField.fieldAbstraction.method);

    if (method.length > 0 && method[0].length > 0) {
      return method[0].map((name) => <option value={name}>{name}</option>);
    }
    return null;
  }
  function handleAdd() {
    const values = [...fieldsRequested];
    values.push({
      fieldId: null,
      fieldName: '',
      isAbstracted: '',
      abstractionParams: [],
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
        isAbstracted: '',
        abstractionParams: [],
      },
    ]);
    setRequestName(' ');

    window.location.reload();
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      fieldsAdded: fieldsRequested,
      name: customrequestname,
    };
    axiosInstance()
      .post('/client/customRequest', data)
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
      <i
        class="far fa-edit"
        style={{ paddingRight: '20px' }}
        data-toggle="modal"
        data-target={`#editcustom-request${customrequest._id}`}
        onClick={onLoad}
        aria-hidden
      />
      <i class="far fa-trash-alt" />
      <div
        className="modal modal-backdrop fade in"
        id={`editcustom-request${customrequest._id}`}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="theme-modal-header">
              <div className="title">
                <strong>EDIT CUSTOM REQUEST</strong>
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
                <div class="form-group">
                  <label htmlFor="request-name">
                    <strong>Custom Request Name</strong>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter a name"
                    value={customrequestname}
                    onChange={(event) => setRequestName(event.target.value)}
                    required
                  />
                </div>
                <strong>Information Needed:</strong>
                <br />
                <br />

                {fieldsRequested.map((field, idx) => (
                  <div class="form-row mb-2">
                    <div key={`infoField-${idx}`} class="col">
                      <select
                        class="form-control"
                        value={field.fieldName}
                        onChange={(e) => handleChange(idx, e)}
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
                        value={field.isAbstracted}
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
                <button
                  type="submit"
                  class="btn custom-btn3 bg-approve"
                  style={{ marginRight: '20px' }}
                >
                  Save
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
