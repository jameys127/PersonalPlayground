import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './CardItem.css'

const CardItem = (prop) => {
  return (
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
                image={prop.img}
                alt="project img"
            />
            <CardContent sx={{color: 'white', background: '#23282b'}}>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>{prop.title}</Typography>
                <Typography textAlign="left" sx={{color: 'white'}}>{prop.description}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default CardItem
