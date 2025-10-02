import React from 'react'
import PublicIntro from './PublicIntro'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const PublicBody = () => {
  return (
    <div className='body-container'>
      <PublicIntro />
      <main className='public_main'>
        <div className='gridCards'>
          <Card sx={{
            width: 400,
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
        </div>
      </main>
    </div>
  )
}

export default PublicBody
