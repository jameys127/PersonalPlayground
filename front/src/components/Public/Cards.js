import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import { useLocation } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import api from '../../app/api/api'

const Cards = () => {

  const {pathname} = useLocation();
  const {isPending, error, data} = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    }
  });

  if(isPending){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Error: {error.message}</p>
  } 
  if(!data){
    return null;
  }

  const cardContent = {
    img: '/image.png',
    title: 'Asteroids',
    description: 'The retro game Asteriods made in Unity'
  }

  if(pathname === '/projects'){
    return(
      <div className='cards'>
        {data.map((p) => (
          <CardItem
            key={p.id}
            img={p.images[0]}
            title={p.title}
            description={p.description}
            slug={p.slug}
            />
        ))}
      </div>
    )
  }else{
    return (
      <div className='cards'>
          <CardItem
              img={cardContent.img}
              title={cardContent.title}
              description={cardContent.description}
              slug='test'
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
