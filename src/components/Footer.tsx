import React from 'react';

export interface IFooterProps {};

const Footer: React.FunctionComponent<IFooterProps> = props => {
  return (
    <div className='site-footer mt-auto flex justify-center items-center w-full'>
      <div>
        <p className='text-center'>
        Site designed and built by <a href="https://isaacmattern.com" className='link'>Isaac Mattern</a>
        </p>
      </div>

    </div>
  );
};

export default Footer