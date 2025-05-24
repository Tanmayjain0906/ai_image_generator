import React from 'react';
import './style.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-circle"></div>
      <p className="loader-text">Loading, please wait...</p>
    </div>
  );
};

export default Loader;
