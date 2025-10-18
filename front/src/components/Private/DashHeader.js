import {Link, useNavigate} from 'react-router-dom'
import './DashHeader.css'
import { useMutation } from '@tanstack/react-query';
import api from '../../app/api/api';
import { useAuth } from '../../app/context/AuthContext';

const DashHeader = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    logoutMutation.mutate();
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/logout', {}, {withCredentials: true});
      return res.data;
    },
    onSuccess: (data) => {
      setAuth({accessToken: null});
      navigate('/');
    }
  })

  return (
    <nav className='dash-navbar'>
      <div className='dash-navbar-container'>
        <Link to='/dash' className='dash-navbar-logo'>
          Dashboard <i className='fa-solid fa-code' />
        </Link>
        <ul className='dash-nav-menu'>
          <li className='dash-nav-item' onClick={logout}>
            <div className='dash-nav-links'>
              <i class="fa-solid fa-arrow-right-from-bracket" /> SignOut
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default DashHeader
