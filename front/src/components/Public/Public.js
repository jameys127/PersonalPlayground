import {Link} from 'react-router-dom';
import PublicFooter from './PublicFooter';
import PublicHeader from './PublicHeader';
import PublicBody from './PublicBody';

const Public = () => {
  return (
    <section className='public'>
      <PublicHeader />
      <PublicBody />
      <PublicFooter />
    </section>
  )
}

export default Public
