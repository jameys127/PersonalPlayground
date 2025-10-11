import React from 'react'
import PublicIntro from './PublicIntro'
import './PublicBody.css'
import Cards from './Cards';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const PublicBody = () => {
  return (
    <div className='body-container'>
      <PublicIntro />
      <Cards />
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
    </div>
  )
}

export default PublicBody
