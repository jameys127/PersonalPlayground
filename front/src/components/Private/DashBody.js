import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../app/api/api'
import CardItem from '../Public/CardItem'
import './DashBody.css'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CardActionArea from '@mui/material/CardActionArea'
import { Link } from 'react-router-dom'

const DashBody = () => {

  const {isPending, error, data} = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    }
  })
  if(isPending){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Error: {error.message}</p>
  }
  if(!data){
    return null;
  }

  return (
    <div className='dash-card-container'>
      <div className='cards'>
          {data.map((p) => (
            <CardItem
              key={p.id}
              img={p.images[0]}
              title={p.title}
              description={p.description}
              slug={p.slug}
              />
          ))}
          <Card
            sx={{
              width: 400,
              height: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 3,
              boxShadow: 'none',
              border: '2px dashed rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': {
                  transform: 'scale(1.04)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  boxShadow: '0 0 15px rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.05)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <CardActionArea LinkComponent={Link} to={'/dash/create'} sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyItems: 'center',

            }}>
              <AddCircleOutlineIcon sx={{fontSize: 60, mb: 1}} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Create New Project
              </Typography>
            </CardActionArea>
          </Card>

        </div>
    </div>
  )
}

export default DashBody
