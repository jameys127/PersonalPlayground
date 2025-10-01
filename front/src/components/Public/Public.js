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

const Public = () => {
  return (
    <section className='public'>
      <PublicHeader />
      <main className='public_main'>
        <p>This will be my personal portfolio of different projects that I decide to show off. The website itself is an example of such a project as I built this with a tech stack I've never used before. Node.js and Express.js for the backend, PostgreSQL for the database, and React for the frontend.</p>

        <Card sx={{
          maxWidth: 400,
          backgroundColor: 'transparent',
          borderRadius: 3,
          boxShadow: 5,
          '&:hover': {
            transform: 'scale(1.04)'
          },
          transition: 'all 0.1s ease'
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="/image.png"
              alt="Asteroids in Unity"
            />
            <CardContent sx={{color: 'white', background: '#23282b'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>
                Asteroids
              </Typography>
              <Typography textAlign="left" sx={{color: 'white'}}>
                Retro game Asteroids created in Unity
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

      </main>
      <PublicFooter />
    </section>
  )
}

export default Public
