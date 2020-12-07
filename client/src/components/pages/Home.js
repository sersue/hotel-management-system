import React, { useState, useEffect } from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Axios from 'axios';
function Home({ checkPermission }) {
  useEffect(() => {
    checkPermission();

  }, []);
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
