import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Pagination from './Pagination';

const AllMatches = () => {
  const [matches, setMatches] = useState([]);

  const getAllMatches = () => {
    axios
      .get('http://localhost:4000/matches')
      .then(function (response) {
        console.log(response);
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
        {matches.map((match, i) => (
          <div
            key={i}
            className='flex flex-row justify-center items-center text-white gap-5 bg-gray-500 p-2 rounded'
          >
            <Link to={`/matches/${match.id}`}>{match.matchName}</Link>
            <span onClick={() => deleteMatch(match)}>x</span>
          </div>
        ))}
      </div>
      <div className='join flex justify-center items-center mt-5'>
        <button className='join-item btn'>1</button>
        <button className='join-item btn btn-active'>2</button>
        <button className='join-item btn'>3</button>
        <button className='join-item btn'>4</button>
      </div>
    </div>
  );
};

export default AllMatches;
