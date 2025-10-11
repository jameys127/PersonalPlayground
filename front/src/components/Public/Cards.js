import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import { useLocation } from 'react-router-dom'

const Cards = () => {

  const cardContent = {
    img: '/image.png',
    title: 'Asteroids',
    descriptions: 'The retro game Asteriods made in Unity'
  }

  const {pathname} = useLocation();

  if(pathname === '/projects'){
    return(
      <div className='cards'>
        <CardItem
            img={cardContent.img}
            title={cardContent.title}
            description={cardContent.descriptions}
        />
        <CardItem
            img='/image.png'
            title='Asteroids'
            description='The retro game Asteroids built in Unity'
        />
        <CardItem
            img='/image.png'
            title='Asteroids'
            description='The retro game Asteroids built in Unity'
        />
        <CardItem
            img={cardContent.img}
            title={cardContent.title}
            description={cardContent.descriptions}
        />
        <CardItem
            img='/image.png'
            title='Asteroids'
            description='The retro game Asteroids built in Unity'
        />
        <CardItem
            img='/image.png'
            title='Asteroids'
            description='The retro game Asteroids built in Unity'
        />
      </div>
    )
  }else{
    return (
      <div className='cards'>
          <CardItem
              img={cardContent.img}
              title={cardContent.title}
              description={cardContent.descriptions}
          />
          <CardItem
              img='/image.png'
              title='Asteroids'
              description='The retro game Asteroids built in Unity'
          />
          <CardItem
              img='/image.png'
              title='Asteroids'
              description='The retro game Asteroids built in Unity'
          />
      </div>
    )
  }

}

export default Cards
