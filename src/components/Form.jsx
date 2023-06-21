import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form = () => {
  const param = useParams();
  const id = param.id;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');

  const postUser = () => {
    const data = {
      id: Math.random() * Math.random(),
      type,
      name,
    };
    axios
      .post('http://localhost:4000/users', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const submitHandeler = (e) => {
    e.preventDefault();
    postUser();
  };

  return (
    <div className='flex justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Form</h2>
          <form
            className='flex flex-col gap-3'
            // onSubmit={param.id ? editHandeler : submitHandeler}
            onSubmit={submitHandeler}
          >
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />
            <input
              type='number'
              placeholder='License'
              // value={license}
              // onChange={(e) => setLicense(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />
            <select
              name='Status'
              id='Status'
              // value={status}
              // onChange={(e) => setStatus(e.target.value)}
              className='select select-bordered w-full max-w-xs'
            >
              <option disabled selected>
                Who shot first?
              </option>
              <option value='IN'>IN</option>
              <option value='OUT'>OUT</option>
            </select>
            <input
              type='datetime-local'
              placeholder='Entry time'
              // value={entryTime}
              // onChange={(e) => setEntryTime(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />
            <button type='submit' className='btn btn-sm'>
              Submit
            </button>
          </form>
          {/* <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Form;
