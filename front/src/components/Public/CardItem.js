import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './CardItem.css'
import { Link } from 'react-router-dom';

const CardItem = (prop) => {
  return (
    <Card sx={{
        width: 400,
        height: 'auto',
        backgroundColor: 'transparent',
        borderRadius: 3,
        boxShadow: 5,
        '&:hover': {
            transform: 'scale(1.04)'
        },
        transition: 'all 0.3s ease'
        }}>
        <CardActionArea LinkComponent={Link} to={`/projects/${prop.slug}`}>
            <CardMedia
                component="img"
                height="200"
                image={prop.img}
                alt="project img"
            />
            <CardContent sx={{color: 'white', background: '#23282b'}}>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>{prop.title}</Typography>
                <Typography textAlign="left" sx={{
                    color: 'white',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>{prop.description}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default CardItem
