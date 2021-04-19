import React from 'react';

export default function AssignRequest() {
  return (
    <form style={{ padding: '0 25px' }}>
      <div class="form-row mb-2">
        <div class="col">
          <strong>Access Expires in:</strong>
        </div>
        <div class="col">
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Never</option>
            <option>1 hour</option>
            <option>1 day</option>
            <option>1 week</option>
            <option>1 year</option>
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
