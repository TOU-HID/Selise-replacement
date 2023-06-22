import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SelectTeams from '../components/SelectTeams';

const Home = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = () => {
    axios
      .get('http://localhost:4000/countries')
      .then(function (response) {
        // console.log(response);
        setCountries(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <Header />
      <SelectTeams countries={countries} />
    </div>
  );
};

export default Home;
