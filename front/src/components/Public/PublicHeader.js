import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './PublicHeader.css';

const PublicHeader = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          PersonalPlayground <i className='fa-solid fa-code' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
              About Me
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='https://github.com/jameys127' className='nav-links' onClick={closeMobileMenu}>
              Github
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Linkedin
            </Link>
          </li>
        </ul>
      </div>
    </nav>


    // <header className='publicHeader'>
    //     <h1>Welcome to my <span className='nowrap'>PersonalPlayground</span></h1>
    //   </header>
  )
}

export default PublicHeader
