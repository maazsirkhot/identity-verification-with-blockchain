import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DashboardNavbar from '../../Header/DashboardNavbar';
import SideBar from '../../Header/SideBar';
import RequestItem from './RequestItem';
import Search from '../../Search';
import { verifier } from '../../../utils/sidebarConfig';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function SentRequests() {
  const [sentRequests, setSentRequests] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;
  function handleClick(value) {
    const params = {
      user: value,
      limit,
      pageNumber,
    };

    setSearchText(value);
    axiosInstance()
      .get('/client/request/searchrequest', { params })
      .then((res) => {
        setTotalPages(res.data.numberOfPages);
        setSentRequests(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }

  useEffect(() => {
    const params = {
      user: searchText,
      limit,
      pageNumber,
    };
    axiosInstance()
      .get('/client/request/searchrequest', { params })
      .then((res) => {
        setTotalPages(res.data.numberOfPages);
        setSentRequests(res.data.data);
      })
      .catch((err) => {
        console.log('Caught in error', err);
      });
  }, []);
  function prevPage() {
    if (pageNumber > 1) {
      const params = {
        user: searchText,
        limit,
        pageNumber: pageNumber - 1,
      };

      axiosInstance()
        .get('/client/request/searchrequest', { params })
        .then((res) => {
          setTotalPages(res.data.numberOfPages);
          setSentRequests(res.data.data);
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
        .get('/client/request/searchrequest', { params })
        .then((res) => {
          setTotalPages(res.data.numberOfPages);
          setPageNumber(pageNumber + 1);
          setSentRequests(res.data.data);
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
          <Search handleClick={handleClick} />
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
                {sentRequests.map((requestDetails) => (
                  <RequestItem requestDetails={requestDetails} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
