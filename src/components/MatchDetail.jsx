import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';

const MatchDetail = () => {
  const param = useParams();
  const id = param.id;
  const [matche, setMatche] = useState({});
  console.log(matche);
  const getMatchesById = () => {
    axios
      .get(`http://localhost:4000/matches/${id}`)
      .then(function (response) {
        console.log(response);
        setMatche(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getMatchesById();
  }, []);

  return (
    <div>
      <Header />
      {matche?.matchName ? (
        <>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-4xl font-bold text-gray-950 text-center'>
              Lets Play Cricket
            </div>
            <div className='text-gray-950 text-center'>
              <span className='text-lg font-bold mr-2'>
                {matche?.bowlingTeam?.name}
              </span>
              vs{' '}
              <span className='text-lg font-bold'>
                {matche?.batingTeam?.name}
              </span>
            </div>
            <div className='text-sm'>
              <span className='text-lg font-bold mr-1'>
                {matche?.bowlingTeam?.name}
              </span>{' '}
              has won the toss and elected to bowl first
            </div>
            <div>
              Total run: {matche?.bowlingTeamRun + matche?.batingTeamRun}
            </div>
          </div>
          <div>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Over</th>
                    <th>Run</th>
                  </tr>
                </thead>
                <tbody>
                  {matche?.overRun.map((item, i) => (
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
        </>
      ) : null}
    </div>
  );
};

export default MatchDetail;
