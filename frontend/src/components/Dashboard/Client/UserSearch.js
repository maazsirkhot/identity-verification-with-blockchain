import React, { useState, useEffect } from 'react';
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
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [infoFields, setInfoFields] = useState([]);
  const limit = 5;

  useEffect(() => {
    axiosInstance()
      .get('/system/infoFields')
      .then((res) => {
        setInfoFields(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }, []);

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
        setTotalPages(res.data.numberOfPages);
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
    if (pageNumber < totalPages) {
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
          console.log('Caught in error', err.response.data);
        });
    }
  }
  return (
    <div className="main-wrapper">
      <DashboardNavbar />
      <SideBar sidebar={verifier.sidebar} />
      <div className="sub-wrapper">
        <div className="container">
          <Search displayFilter={false} handleClick={handleClick} />
          {searchText !== '' ? (
            <>
              <div class="pagination">
                <h4 aria-hidden onClick={prevPage}>
                  &laquo;
                </h4>
                <p>
                  {pageNumber} of {totalPages}
                </p>
                <h4 aria-hidden onClick={nextPage}>
                  &raquo;
                </h4>
              </div>
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <br />
                    {userDetails.length > 0
                      ? userDetails.map((details) => (
                          <SearchItems
                            userDetails={details}
                            key={details.userId}
                            infoFields={infoFields}
                          />
                        ))
                      : 'No such user exists'}
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
