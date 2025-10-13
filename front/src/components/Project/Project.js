import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
import PublicHeader from '../Public/PublicHeader';
import PublicFooter from '../Public/PublicFooter';
import Cards from '../Public/Cards';
import './Project.css';

const Projects = () => {

  return (
    <section className='public'>
        <PublicHeader />
        <div className='project-section'>
            <h1 className='project-intro'>
                My Projects
            </h1>
            <h3>From video games to custom compilers!</h3>
            <Cards />
        </div>
        <PublicFooter />
    </section>
  )
}

export default Projects
