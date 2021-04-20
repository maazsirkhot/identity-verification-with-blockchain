import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function AssignRequest({ requestId }) {
  const [expiryTime, setExpiryTime] = useState('');

  const expiry = {
    hour: {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
    },
    day: {
      years: 0,
      months: 0,
      weeks: 0,
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    week: {
      years: 0,
      months: 0,
      weeks: 1,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    year: {
      years: 1,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  };

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      action: 'APPROVED',
      expiry: expiry[expiryTime],
    };
    console.log(data, requestId);
    axiosInstance().post(`/user/request/${requestId}`, data);
  }
  return (
    <form style={{ padding: '0 25px' }} onSubmit={onSubmit}>
      <div class="form-row mb-2">
        <div class="col">
          <strong>Access Expires in:</strong>
        </div>
        <div class="col">
          <select
            class="form-control"
            onChange={(event) => setExpiryTime(event.target.value)}
            value={expiryTime}
            required
          >
            <option value="" selected>
              Select a value
            </option>
            <option value="hour">1 hour</option>
            <option value="day">1 day</option>
            <option value="week">1 week</option>
            <option value="year">1 year</option>
          </select>
        </div>
      </div>
      <br />
      <br />
      <button
        type="submit"
        class="btn custom-btn3 bg-approve"
        style={{ marginRight: '20px' }}
      >
        Approve
      </button>
      <button type="button" class="btn custom-btn3 bg-decline">
        Reject
      </button>
    </form>
  );
}
