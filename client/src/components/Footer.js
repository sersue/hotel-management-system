import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the hotel
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link >How it works</Link>
            <Link >Testimonials</Link>
            <Link >Careers</Link>
            <Link >Investors</Link>
            <Link >Terms of MyPage</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link >Contact</Link>
            <Link >Support</Link>
            <Link >Destinations</Link>
            <Link >Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link >Instagram</Link>
            <Link >Facebook</Link>
            <Link >Youtube</Link>
            <Link >Twitter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
