import {Link} from 'react-router-dom'

const DashHeader = () => {
  return (
    <header className='dash-header'>
        <div className='dash-header-container'>
            <Link to=''>
                <h1 className='dash-header-title'>PersonalPlayground</h1>
            </Link>
            <nav className='dash-header-nav'>
                {/* add navigation buttons */}
            </nav>
        </div>
    </header>
  )
}

export default DashHeader
