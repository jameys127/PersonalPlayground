import React from 'react'
import { Link } from 'react-router-dom';
import './PublicFooter.css'

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div className="footer-snippet">
        Passion for GameDev |<br /> Wanting to learn all that I possibly can!
      </div>
      <div className="public-footer">
        ©{currentYear} Jeremiah Sheehy. All rights reserved
      </div>
      <ul className="footer-link-list">
        <li>
          <a href="https://github.com/jameys127" target="_blank" rel="noopener noreferrer">
            Github <i class="fa-brands fa-github"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jeremiah-sheehy-225bba258/" target="_blank" rel="noopener noreferrer">
            Linkedin <i class="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Resume <i class="fa-solid fa-file"></i>
          </a>
        </li>
      </ul>
      <Link to={'/login'} className='to-private'>
        If you're me <i class="fa-solid fa-arrow-right"></i>
      </Link>
    </footer>
  )
}

export default PublicFooter
