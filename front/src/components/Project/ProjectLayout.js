import React, { Fragment } from 'react'
import PublicHeader from '../Public/PublicHeader'
import { Outlet } from 'react-router-dom'
import PublicFooter from '../Public/PublicFooter'

const ProjectLayout = () => {
  return (
    <Fragment>
        <PublicHeader />
        <div className='project-page-container'>
            <Outlet />
        </div>
        <PublicFooter />
    </Fragment>
  )
}

export default ProjectLayout
