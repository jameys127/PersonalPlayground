import React from 'react'
import PublicIntro from './PublicIntro'
import './PublicBody.css'
import Cards from './Cards';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AnimatedRoutes from '../../features/animated/AnimatedRoutes';

const PublicBody = () => {
  return (
    <div className='body-container'>
      <AnimatedRoutes>
      <PublicIntro />
      <div className='card-grid-section'>
        <Cards />
      </div>
      <div className='button-container'>
        <Button 
          component={Link} 
          to="/projects" 
          variant='outlined' 
          color='secondary'
          size='large'
        >
          See more...
        </Button>
      </div>
      </AnimatedRoutes>
    </div>
  )
}

export default PublicBody
