import {Outlet} from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = () => {
  return (
    <Fragment>
        <DashHeader />
        <div className='dash-container'>
            <Outlet />
        </div>
        <DashFooter />
    </Fragment>
  )
}

export default DashLayout
