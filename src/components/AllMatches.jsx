import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 3;

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getAllMatches = () => {
    axios
      .get('http://localhost:4000/matches')
      .then(function (response) {
        // console.log(response);
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllMatches();
  }, []);

  const deleteMatch = (match) => {
    axios
      .delete(`http://localhost:4000/matches/${match.id}`)
      .then(function (response) {
        console.log(response);
        getAllMatches();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center gap-3 mt-5'>
        <div className='text-4xl font-bold text-gray-950 text-center'>
          All match list
        </div>
        {currentMatches.map((match, i) => (
          <div
            key={i}
            className='flex flex-row justify-center items-center text-white gap-5 bg-gray-500 p-2 rounded'
          >
            <Link to={`/matches/${match.id}`}>{match.matchName}</Link>
            <span onClick={() => deleteMatch(match)}>x</span>
          </div>
        ))}
      </div>
      <div className='flex mt-4 justify-center items-center'>
        {Array.from(
          { length: Math.ceil(matches.length / matchesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              className={`mx-2 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllMatches;
