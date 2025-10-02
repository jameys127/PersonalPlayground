import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PublicFooter from './PublicFooter';
import PublicHeader from './PublicHeader';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import PublicIntro from './PublicIntro';
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
