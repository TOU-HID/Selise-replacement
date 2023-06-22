import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SelectTeams = ({ countries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [count, setCount] = useState(0);

  const getSelectedCountries = () => {
    axios
      .get('http://localhost:4000/selectedTeams')
      .then(function (response) {
        // console.log(response);
        const countriesName = response.data.map((item) => item.name);
        const count = response.data.length;
        setCount(count);
        setSelectedCountries(countriesName);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSelectedCountries();
  }, []);

  const selectTeam = (team) => {
    if (selectedCountries.length <= 1) {
      axios
        .post('http://localhost:4000/selectedTeams', team)
        .then(function (response) {
          // console.log(response);
          setCount((pre) => pre + 1);
          getSelectedCountries();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Your can't select more than two countries");
    }
  };

  const deleteMatch = (country) => {
    axios
      .delete(`http://localhost:4000/selectedTeams/${country.id}`)
      .then(function (response) {
        // console.log(response);
        getSelectedCountries();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col justify-center w-full'>
      <div className='text-2xl font-bold text-gray-950 text-center'>
        Lets play cricket
      </div>
      <div className='grid grid-cols-2 place-items-center gap-5'>
        {countries.map((country, i) => (
          <div
            key={i}
            onClick={() => selectTeam(country)}
            className='relative border-2 border-gray-600 rounded-md'
          >
            {selectedCountries.includes(country.name) ? (
              <div
                className='absolute -top-1 right-2 font-bold cursor-pointer'
                onClick={() => deleteMatch(country)}
              >
                x
              </div>
            ) : null}
            <img
              src={country.img}
              alt='country'
              className='w-28 h-16 border-2 border-gray-600 mt-5 mx-5 transition ease-in-out active:scale-75'
            />
            <div className='text-center'>{country.name}</div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {count === 2 ? (
          <Link to='/toss'>
            <button className='text-white font-bold bg-gray-800 p-2 rounded-md w-44'>
              Toss
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default SelectTeams;
