import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DOCUMENT_TYPE } from '../../actions/types';
import logo from '../../assets/img/logo_v2.png';
import passport from '../../assets/img/passport.png';
import license from '../../assets/img/drivers-license.png';
import identitycard from '../../assets/img/identitycard.png';

export default function DocumentType({ activeTabChange }) {
  const type = useSelector((state) => state.uploads.documenttype);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (type === '') {
      alert('Please select an identification type');
    } else {
      activeTabChange(2);
    }
  }
  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <div className="theme-modal-header">
        <div className="title">
          <img src={logo} alt="logo" width="100" />
          <br />
          <span
            aria-hidden="true"
            className="back-btn"
            onClick={activeTabChange.bind(this, '0')}
            onKeyDown={activeTabChange.bind(this, '0')}
          >
            <i className="fas fa-arrow-left" />
          </span>
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

      <div className="modal-body ">
        <form onSubmit={onSubmit}>
          <section className="document-type">
            <div className="container">
              <p className="form-label">Please select an Identification Type</p>
              <div className="document-type-radio-group">
                <div className="id-radio-group">
                  <input
                    type="radio"
                    id="driving-license"
                    value="driving-license"
                    checked={type === 'CADL'}
                    onChange={() =>
                      dispatch({
                        type: DOCUMENT_TYPE,
                        payload: 'CADL',
                      })
                    }
                    name="document-type"
                  />
                  <label className="radio" htmlFor="driving-license">
                    <img src={license} alt="" width="85" height="70" />
                    <br />
                    Driver&apos;s License
                  </label>
                </div>
                <div className="id-radio-group">
                  <input
                    type="radio"
                    id="passport"
                    value="passport"
                    checked={type === 'PASSPORT'}
                    onChange={() =>
                      dispatch({
                        type: DOCUMENT_TYPE,
                        payload: 'PASSPORT',
                      })
                    }
                    name="document-type"
                  />
                  <label className="radio " htmlFor="passport">
                    <img src={passport} alt="" width="65" height="75" />
                    <br />
                    Passport
                  </label>
                </div>

                <div className="id-radio-group">
                  <input
                    type="radio"
                    id="identity-card"
                    value="identity-card"
                    name="document-type"
                    checked={type === 'ID'}
                    onChange={() =>
                      dispatch({
                        type: DOCUMENT_TYPE,
                        payload: 'ID',
                      })
                    }
                  />
                  <label className="radio" htmlFor="identity-card">
                    <img src={identitycard} alt="" width="85" height="70" />
                    <br />
                    Identity Card
                  </label>
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="next-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
