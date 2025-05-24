import React from 'react';
import './style.css';
import Header from '../../components/Header';
import Steps from '../../components/Steps';
import Description from '../../components/Description';
import Testimonials from '../../components/Testimonials';
import SeeTheMagic from '../../components/SeeTheMagic';


const HomePage = () => {
  
  return (
    <div className="homepage">
      
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <SeeTheMagic />
    </div>
  );
};

export default HomePage;
