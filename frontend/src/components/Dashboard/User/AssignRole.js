import React, { useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

export default function AssignRole() {
  useEffect(() => {
    axiosInstance()
      .get('/user/role')
      .then((res) => console.log(res.data));
  }, []);
  return <div>Assign a role</div>;
}
