import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function AssignRole({ client, requestId, isDisabled }) {
  const [defaultRoles, setDefaultRoles] = useState([]);
  const [roleName, setRole] = useState('');
  const [roleId, setRoleId] = useState('');
  useEffect(() => {
    const params = {
      option: 'default',
    };
    axiosInstance()
      .get('/user/role', { params })
      .then((res) => {
        setDefaultRoles(res.data.data);
      });
  }, []);

  function getRoleInformation(rolename) {
    const roleInfo = defaultRoles.filter(
      (roles) => roles.roleName === rolename
    );

    return roleInfo[0].dataFields.map((fieldsRequested) => (
      <small>
        {fieldsRequested.fieldName}({fieldsRequested.userDisplay})
        <br />
      </small>
    ));
  }

  function onChange(event) {
    setRole(event.target.value);
    setRoleId(
      event.target.options[event.target.options.selectedIndex].getAttribute(
        'roleid'
      )
    );
  }
  function onSubmit(e) {
    e.preventDefault();
    if (isDisabled()) {
      alert('You do not have all the information uploaded!');
    } else {
      const data = {
        requestId,
        client,
        role: {
          roleName,
          roleId,
        },
        action: 'APPROVED',
      };

      axiosInstance()
        .post('/user/assignRole', data)
        .then((res) => {
          console.log(res.data);
          alert('Your information has been shared!');
          window.location.reload();
        });
    }
  }

  return (
    <form style={{ padding: '0 25px' }} onSubmit={onSubmit}>
      <div class="form-row mb-2">
        <div class="col">
          <strong>Select a Role:</strong>
        </div>
        <div class="col">
          <select
            class="form-control"
            onChange={onChange}
            value={roleName}
            required
          >
            <option value="" selected>
              Select a value
            </option>
            {defaultRoles.length > 0 &&
              defaultRoles.map((value) => (
                <option value={value.roleName} roleid={value._id}>
                  {value.roleName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <br />

      {roleName !== '' ? (
        <>
          <em>
            <p>Information that will be shared:</p>
          </em>
          <p>{getRoleInformation(roleName)}</p>
        </>
      ) : null}
      <br />
      <br />
      <button
        type="submit"
        class="btn custom-btn3 bg-approve"
        style={{ marginRight: '20px' }}
      >
        Assign
      </button>
      <button type="button" class="btn custom-btn3 bg-decline">
        Reject
      </button>
    </form>
  );
}
