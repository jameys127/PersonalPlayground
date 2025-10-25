import React from 'react'
import SwiperComponent from '../SwiperComponent';
import './ProjectPage.css'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../app/api/api';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify'
import CircularProgress from '@mui/material/CircularProgress';
import AnimatedRoutes from '../../features/animated/AnimatedRoutes';


const ProjectPage = () => {

    const {slug} = useParams();
    const {isPending, error, data} = useQuery({
        queryKey: [`${slug}`],
        queryFn: async () => {
            const res = await api.get(`/projects/${slug}`);
            return res.data;
        }
    });

    if(isPending){
        return <div className='loading'><CircularProgress /></div>
    } 
    if(error){
        return <p className='loading'>Error: {error.response.data.message}</p>
    }
    if(!data){
        return null
    }
  return (
    <div className='project-page-body'>
        <AnimatedRoutes>
        <div className='slider-section'>
            <SwiperComponent
                imgs={data[0].images}
            />
        </div>
        <div className='project-header-bar'>
            <h1 className='project-title'>{data[0].title}</h1>
            <div className='project-buttons'>
                <Button
                    href={data[0].github}
                    variant='outlined'
                    color='secondary'
                    size='large'
                >
                    Github Page
                </Button>
                <Button
                    href={data[0].link}
                    variant='outlined'
                    color='secondary'
                    size='large'
                >
                    View
                </Button>
            </div>
        </div>
        <div className='project-description'>
            {parse(DOMPurify.sanitize(data[0].description))}
        </div>
        </AnimatedRoutes>
    </div>
  )
}

export default ProjectPage
