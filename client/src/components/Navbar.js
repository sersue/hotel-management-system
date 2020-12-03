import React, { useState, useEffect } from 'react';
import { Button1 } from './Button';
import { Button2 } from './Button';
import { Button3 } from './Button';
import { Button4 } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Axios from 'axios'
function Navbar({ userin, getuser }) {
  const [loggedIn, setloggedIn] = useState(false);
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
  window.addEventListener('resize', showButton);

  useEffect(() => {
    showButton();

  }, []);



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
                방 소개
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



          </ul>
          {!userin ?
            <div>
              {button && <Button2 buttonStyle='btn--outline'>LOGIN</Button2>}
              {button && <Button1 buttonStyle='btn--outline'>SIGN UP</Button1>}
            </div>
            :
            <div>
              {button && <Button3 buttonStyle='btn--outline'>내 정보</Button3>}
              {button && <Button4 buttonStyle='btn--outline' getuser={getuser}>로그아웃</Button4>}
            </div>
          }

        </div>
      </nav>
    </>
  );
}

export default Navbar;
