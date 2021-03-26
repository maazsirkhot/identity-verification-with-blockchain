import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import Search from '../../Search';
import SearchItems from './SearchItems';
import { verifier } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function UserSearch() {
  const [userDetails, setUserDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const limit = 5;
  function handleClick(value) {
    const params = {
      user: value,
      limit,
      pageNumber,
    };
    setSearchText(value);
    axiosInstance()
      .get('/client/fetch/searchuser', { params })
      .then((res) => {
        setUserDetails(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }
  function prevPage() {
    if (pageNumber > 1) {
      const params = {
        user: searchText,
        limit,
        pageNumber: pageNumber - 1,
      };

      axiosInstance()
        .get('/client/fetch/searchuser', { params })
        .then((res) => {
          setUserDetails(res.data.data);
          setPageNumber(pageNumber - 1);
        })
        .catch((err) => {
          console.log('Caught in error', err);
        });
    }
  }
  function nextPage() {
    const params = {
      user: searchText,
      limit,
      pageNumber: pageNumber + 1,
    };

    axiosInstance()
      .get('/client/fetch/searchuser', { params })
      .then((res) => {
        setUserDetails(res.data.data);
        setPageNumber(pageNumber + 1);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={verifier.sidebar} />
      <div className="sub-wrapper">
        <div className="container">
          <Search displayFilter={false} handleClick={handleClick} />
          {userDetails.length > 0 ? (
            <>
              <div class="pagination">
                <h4 aria-hidden onClick={prevPage}>
                  &laquo;
                </h4>
                <p>{pageNumber}</p>
                <h4 aria-hidden onClick={nextPage}>
                  &raquo;
                </h4>
              </div>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <br />
                    {userDetails.map((details) => (
                      <SearchItems userDetails={details} key={details.userId} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
