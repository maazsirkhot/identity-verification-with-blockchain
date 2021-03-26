import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filtericon from '../assets/img/filter-icon.png';

export default function Search() {
  function dateChange(event, picker) {
    console.log('Start Date', picker.startDate.format());
  }
  const [toggleClassName, setToggleClassValue] = useState('');
  const [toggleState, setToggleState] = useState(false);
  function toggleClass() {
    if (!toggleState) {
      setToggleClassValue('show-search');
      setToggleState(true);
    } else {
      setToggleState(false);
      setToggleClassValue('');
    }
  }

  return (
    <div style={{ margin: '10px 15px' }}>
      <form class="dashboard-search">
        <div class="inner-form">
          <div class="basic-search">
            <div class="input-field">
              <input id="search" type="text" placeholder="Search by User" />
              <div class="icon-wrap">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z" />
                </svg>
              </div>
            </div>
          </div>
          <div class={`advance-search ${toggleClassName}`}>
            <div class="row">
              <div class="input-select">
                <label htmlFor> STATUS</label>
                <select class="form-control">
                  <option>APPROVED</option>
                  <option>PENDING</option>
                  <option>REJECTED</option>
                </select>
              </div>
              <div class="input-select">
                <label htmlFor>REQUEST-DATE</label>
                <DateRangePicker onApply={dateChange}>
                  <input type="text" className="form-control" />
                </DateRangePicker>
              </div>
            </div>

            <div class="input-field group-btn">
              <button class="btn-delete" id="delete" type="button">
                Reset
              </button>
              <button class="btn-search" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="search-filter-btn"
          onClick={toggleClass}
        >
          Filter
          <img
            src={filtericon}
            width="20"
            height="20"
            alt=""
            style={{ float: 'right' }}
          />
        </button>
      </form>
    </div>
  );
}
