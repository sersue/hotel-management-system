import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-room2.jpg'
              text='Sweet Room'
              label='Luxury'
              // path='/mypage'
            />
            <CardItem
              src='images/img-lounge.jpg'
              text='Hotel Lounge'
              label='Luxury'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-restaurant.jpg'
              text='Restaurant'
              label='Luxury'
            />
            <CardItem
              src='images/img-swimmingpool2.jpg'
              text='Swimming Pool'
              label='Luxury'
            />
            <CardItem
              src='images/img-parking2.jpg'
              text='Parking'
              label='Luxury'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
