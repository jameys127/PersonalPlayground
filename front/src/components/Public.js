import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const Public = () => {
  return (
    <section className='public'>
      <header className='publicHeader'>
        <h1>Welcome to my <span className='nowrap'>PersonalPlayground</span></h1>
      </header>
      <main className='public_main'>
        <p>This will be my personal portfolio of different projects that I decide to show off. The website itself is an example of such a project as I built this with a tech stack I've never used before. Node.js and Express.js for the backend, PostgreSQL for the database, and React for the frontend.</p>

        <Card sx={{maxWidth: 325}} className='muiCard'>
          <CardActionArea>
            <CardMedia
              component="img"
              height="170"
              image="/image.png"
              alt="Asteroids in Unity"
            />
            <CardContent sx={{color: 'white', background: '#23282b'}}>
              <Typography gutterBottom textAlign="left" variant="h5" component="div">
                Asteroids
              </Typography>
              <Typography variant='body2' textAlign="left" sx={{color: 'white'}}>
                Retro game Asteroids created in Unity
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>


        {/* <div className='cards'>
          <article className='card'>
            <header>
              <h2>Short Heading</h2>
              <img src='/image.png' alt='Something IDK'/>
              <p>This was a project making the game 'Asteroids'</p>
            </header>
          </article>

          <article className='card'>
            <header>
              <h2>Short Heading 2</h2>
              <img src='/image.png' alt='Something IDK'/>
              <p>This was a project making the game 'Asteroids'</p>
            </header>
          </article>
        </div> */}
      </main>
      <footer className='publicFooter'>
        © Sheehy development. All rights resereved
      </footer>
    </section>
  )
}

export default Public
