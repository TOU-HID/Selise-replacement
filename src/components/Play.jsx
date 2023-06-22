import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const Play = () => {
  const param = useParams();
  const id = param.id;
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [bowlingTeam, setBowlingTeam] = useState({});
  const [batingTeam, setBatingTeam] = useState({});
  const [totalRun, setTotalRun] = useState(0);
  const [overRun, setOverRun] = useState([]);
  const [over, setOver] = useState(0);
  const [bowlCount, setBowlCount] = useState(0);
  const [winTeam, setWinTeam] = useState('');

  const getSelectedCountries = () => {
    axios
      .get('http://localhost:4000/selectedTeams')
      .then(function (response) {
        // console.log('response', response);
        setSelectedCountries(response.data);
        const bowlingTeam = response.data.find((item) => item.id == id);
        setBowlingTeam(bowlingTeam);
        const batingTeam = response.data.find((item) => item.id != id);
        setBatingTeam(batingTeam);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSelectedCountries();
  }, []);

  useEffect(() => {
    const bowlingTeamRun = overRun
      .filter((item) => item.name === bowlingTeam.name)
      .reduce((total, ele) => total + ele.run, 0);
    const batingTeamRun = overRun
      .filter((item) => item.name === batingTeam.name)
      .reduce((total, ele) => total + ele.run, 0);

    if (bowlingTeamRun > batingTeamRun) {
      setWinTeam(bowlingTeam.name);
    } else {
      setWinTeam(batingTeam.name);
    }
  }, [over]);

  useEffect(() => {
    const tempTotalRun = overRun.reduce((total, ele) => total + ele.run, 0);
    setTotalRun(tempTotalRun);
  }, [bowlCount]);

  const bowling = () => {
    const runs = [1, 2, 3, 4, 6];
    const run = runs[Math.floor(Math.random() * runs.length)];
    // console.log(run);
    if (bowlCount === 6) {
      setOver((pre) => pre + 1);
      setBowlCount(0);
    }
    if (over < 2) {
      const name = over === 0 ? batingTeam?.name : bowlingTeam?.name;
      const tempOverRun = [...overRun, { over, bowlCount, run, name }];
      setBowlCount((pre) => pre + 1);
      setOverRun(tempOverRun);
    }
  };

  const newMatch = () => {
    selectedCountries.map((item) =>
      axios
        .delete(`http://localhost:4000/selectedTeams/${item.id}`)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    );

    const data = {
      id: Math.random() * Math.random(),
      matchName: `${bowlingTeam.name} vs ${batingTeam.name}`,
      bowlingTeamRun: overRun
        .filter((item) => item.name === bowlingTeam.name)
        .reduce((total, ele) => total + ele.run, 0),
      batingTeamRun: overRun
        .filter((item) => item.name === batingTeam.name)
        .reduce((total, ele) => total + ele.run, 0),
      overRun,
      bowlingTeam,
      batingTeam,
      winner: winTeam,
    };
    axios
      .post('http://localhost:4000/matches', data)
      .then(function (response) {
        // console.log(response);
        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center'>
        <div className='text-4xl font-bold text-gray-950 text-center'>
          Lets Play Cricket
        </div>
        <div className='text-gray-950 text-center'>
          <span className='text-lg font-bold mr-2'>{bowlingTeam?.name}</span>
          vs <span className='text-lg font-bold'>{batingTeam?.name}</span>
        </div>
        <div className='text-sm'>
          <span className='text-lg font-bold mr-1'>{bowlingTeam?.name}</span>{' '}
          has won the toss and elected to bowl first
        </div>
        <div>Total run: {totalRun}</div>
      </div>
      {over === 2 ? (
        <div className='text-center'>{winTeam} is the winner</div>
      ) : null}
      <div className='flex flex-row justify-center mt-2 gap-3'>
        <button
          className='text-white font-bold bg-gray-800 p-2 rounded-md transition ease-in-out active:scale-75'
          onClick={bowling}
        >
          {over === 2 ? 'Full Score' : 'Bowl'}
        </button>
        {over === 2 ? (
          <button
            className='text-white font-bold bg-gray-800 p-2 rounded-md transition ease-in-out active:scale-75'
            onClick={newMatch}
          >
            Play New Match
          </button>
        ) : null}
      </div>
      <div>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>Over</th>
                <th>Run</th>
              </tr>
            </thead>
            <tbody>
              {overRun.map((item, i) => (
                <tr key={i}>
                  <td>
                    {item.over}.{item.bowlCount}
                  </td>
                  <td>{item.run}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Play;
