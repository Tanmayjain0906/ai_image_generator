import React, { useContext } from 'react';
import './style.css';
import Header from '../../components/Header';
import Steps from '../../components/Steps';
import Description from '../../components/Description';
import Testimonials from '../../components/Testimonials';
import SeeTheMagic from '../../components/SeeTheMagic';
import { AppContext } from '../../context/AppContext';
import Loader from '../../components/Loader';


const HomePage = () => {

  const {isUserLoading} = useContext(AppContext);

  if(isUserLoading)
  {
    return (
      <Loader/>
    )
  }
  
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
