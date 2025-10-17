import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login-container'>
      <div className='login'>
        <Link to={'/'} className='login-back'><i className='fa-solid fa-arrow-left'/> Back</Link>
        <h1 className='login-title'>Welcome, Me</h1>
        <div className='login-inputs'>
          <div className='login-input'>
            <input type='text' placeholder='Username'/>
          </div>
          <div className='login-input'>
            <input type='password' placeholder='Password'/>
          </div>
        </div>
        <div className='login-button'>
          <button className='button'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
