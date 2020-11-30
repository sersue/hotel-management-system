import React, { useState, useEffect } from 'react';
import { Button1 } from './Button';
import { Button2 } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HOTEL
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <Link
                to='/description'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                방소개
              </Link>
            </li>
          <li className='nav-item'>
              <Link
                to='/reservation'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                예약하기
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                 to='/confirmation' className='nav-links'
                 onClick={closeMobileMenu}
                 >
                예약확인
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/mypage'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                내 정보
              </Link>
            </li>
            
            <li>
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                LOGIN
              </Link>
            </li>
            <li>
              <Link
                to='/signup'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button2 buttonStyle='btn--outline'>LOGIN</Button2>}
          {button && <Button1 buttonStyle='btn--outline'>SIGN UP</Button1>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
