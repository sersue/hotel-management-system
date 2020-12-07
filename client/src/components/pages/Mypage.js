import React, { useState, useEffect } from 'react';
import '../../App.css';
import Mypa from '../MyPage';


export default function Mypage({ checkPermission }) {
  useEffect(() => {
    checkPermission();

  }, []);
  return <Mypa></Mypa>;
}
