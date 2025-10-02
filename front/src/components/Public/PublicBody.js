import React from 'react'
import PublicIntro from './PublicIntro'
import './PublicBody.css'
import Cards from './Cards';

const PublicBody = () => {
  return (
    <div className='body-container'>
      <PublicIntro />
      <Cards />
    </div>
  )
}

export default PublicBody
