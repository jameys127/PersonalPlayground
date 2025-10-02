import React from 'react'
import './PublicFooter.css'

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='publicFooter'>
        Copyright © Sheehy {currentYear}. All rights resereved
    </footer>
  )
}

export default PublicFooter
