import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

const Cards = () => {
  return (
    <div className='cards'>
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
            img='/image.png'
            title='Asteroids'
            description='The retro game Asteroids built in Unity'
        />
    </div>
  )
}

export default Cards
