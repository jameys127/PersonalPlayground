import React from 'react'
import PublicHeader from '../PublicHeader'
import PublicFooter from '../PublicFooter'
import './About.css';
import AnimatedRoutes from '../../../features/animated/AnimatedRoutes';

const About = () => {
  return (
    <>
        <PublicHeader />
        <div className='about-me-container'>
            <AnimatedRoutes>
            <div className='about-body'>
                <h1>About me</h1>
                <div className='about-me-paragraphs'>
                    <p>
                        Hello, my name is Jeremiah Sheehy, a software developer from California with a Bachelor degree in Computer Science from California State University, Northridge. I'm currently expanding my portfolio and pursuing a junior programming role, while continually working to grow my technical skills and experience.<br/><br/>

                        I'm most passionate about backend development, where I get to focus on logic, structure, and database implementation. My current work centers around Node.js, Express, and PostgreSQL, which is what this website was built with, as well as some React.js when a user interface is needed. I also have a strong background in Java and am eager to explore Spring Boot to build on that foundation.<br/><br/>

                        Outside of professional development, I enjoy working on complex, systems-level projects like my custom compiler or my hobby of game development. Gamedev is where I can merge my love of art (even though I'm not that talented) with my love of programming.<br/><br/>

                        All of the code for the projects featured on this website, including the website itself, is available on my <a href="https://github.com/jameys127" target="_blank" rel="noopener noreferrer">GitHub</a> page.
                    </p>
                </div>
            </div>
            </AnimatedRoutes>
        </div>
        <PublicFooter />
    </>
  )
}

export default About
