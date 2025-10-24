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
    return <p className='loading'>Loading...</p>
  }
  if(error){
    return <p className='loading'>Error: {error.message}</p>
  } 
  if(!data){
    return null;
  }

  if(pathname === '/projects'){
    return(
      <div className='cards'>
        {data.map((p) => (
          <CardItem
            key={p.id}
            img={p.images[0]}
            title={p.title}
            description={p.short}
            slug={p.slug}
            />
        ))}
      </div>
    )
  }else{
    return (
      <div className='cards'>
        {data.slice(0, 3).map((p) => (
          <CardItem
            key={p.id}
            img={p.images[0]}
            title={p.title}
            description={p.short}
            slug={p.slug}
          />
        ))}
      </div>
    )
  }

}

export default Cards
