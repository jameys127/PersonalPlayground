import React from 'react'
import SwiperComponent from '../SwiperComponent';
import './ProjectPage.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const ProjectPage = () => {
    const string = `
Hello, my name is Jeremiah Sheehy, a software developer from California with a Bachelor degree in Computer Science from California State University, Northridge. I'm currently expanding my portfolio and pursuing a junior programming role, while continually working to grow my technical skills and experience.

I'm most passionate about backend development, where I get to focus on logic, structure, and database implementation. My current work centers around Node.js, Express, and PostgreSQL, which is what this website was built with, as well as some React.js when a user interface is needed. I also have a strong background in Java and am eager to explore Spring Boot to build on that foundation.

Outside of professional development, I enjoy working on complex, systems-level projects like my custom compiler or my hobby of game development. Gamedev is where I can merge my love of art (even though I'm not that talented) with my love of programming.

All of the code for the projects featured on this website, including the website itself, is available on my GitHub page.`;
  return (
    <div className='project-page-body'>
        <div className='slider-section'>
            <SwiperComponent />
        </div>
        <div className='project-header-bar'>
            <h1 className='project-title'>Asteroids Unity Project</h1>
            <div className='project-buttons'>
                <Button
                    href='https://github.com/jameys127'
                    variant='outlined'
                    color='secondary'
                    size='large'
                >
                    Github Page
                </Button>
                <Button
                    component={Link}
                    variant='outlined'
                    color='secondary'
                    size='large'
                >
                    View
                </Button>
            </div>
        </div>
        <div className='project-description'>
            <pre>{string}</pre>
        </div>
    </div>
  )
}

export default ProjectPage
