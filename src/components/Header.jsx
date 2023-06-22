import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex flex-row bg-gray-800 text-white h-16 items-center px-4'>
      <div className='text-3xl font-bold'>Cricket Game</div>
      <div className='flex flex-row items-center px-10 gap-10'>
        <Link to='/'>Select teams</Link>
        <Link to='/matches'>All match list</Link>
      </div>
    </div>
  );
};

export default Header;
