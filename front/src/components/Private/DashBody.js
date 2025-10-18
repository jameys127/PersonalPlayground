import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../app/api/api'
import CardItem from '../Public/CardItem'
import './DashBody.css'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'


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
              backgroundColor: 'transparent',
              borderRadius: 3,
              boxShadow: 'none',
              borderStyle: 'dotted',
              borderColor: '#171b1dff',
              '&:hover': {
                  transform: 'scale(1.04)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 300, mb: 1 }}>
              +
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Create New Project
            </Typography>
          </Card>

        </div>
    </div>
  )
}

export default DashBody
