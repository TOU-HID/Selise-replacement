import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const Toss = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [bowlingTeam, setBowlingTeam] = useState({});

  const getSelectedCountries = () => {
    axios
      .get('https://server-selise-test.onrender.com/selectedTeams')
      .then(function (response) {
        console.log(response);
        setSelectedCountries(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSelectedCountries();
  }, []);

  const selectBowlingTeam = (team) => {
    console.log(team);
    setBowlingTeam(team);
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center h-96'>
        <div className='text-2xl font-bold text-gray-950 text-center'>
          Select Who will Bowl
        </div>
        <div className='flex flex-row'>
          {selectedCountries.map((country, i) => (
            <div key={i} className='flex flex-row justify-center items-center'>
              <img
                src={country.img}
                alt='country'
                className='w-40 h-20 border-2 border-gray-600 mt-5 mx-5 transition ease-in-out active:scale-75'
              />
              <input
                type='radio'
                name='radio-3'
                className='radio radio-secondary'
                onClick={() => selectBowlingTeam(country)}
              />
            </div>
          ))}
        </div>
        <Link
          to={`/play/${bowlingTeam.id}`}
          className='text-white font-bold bg-gray-800 p-2 rounded-md mt-5'
        >
          Lets Play
        </Link>
      </div>
    </div>
  );
};

export default Toss;
