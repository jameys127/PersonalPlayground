import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
import PublicHeader from '../Public/PublicHeader';
import PublicFooter from '../Public/PublicFooter';
import Cards from '../Public/Cards';
import './Project.css';
import AnimatedRoutes from '../../features/animated/AnimatedRoutes';

const Projects = () => {

  return (
    <div className='project-section'>
      <AnimatedRoutes>
        <div className='project-intro-container'>
          <h1 className='project-intro'>
              My Projects
          </h1>
          <h3>From video games to custom compilers!</h3>
        </div>
        <div className='card-grid'>
          <Cards />
        </div>
      </AnimatedRoutes>
    </div>
  )
}

export default Projects
