import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import {useQuill} from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import './DashEdit.css'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '../../app/api/api'

const DashEdit = () => {
  const [title, setTitle] = useState('');
  const [github, setGithub] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState([]);
  const navigate = useNavigate();
  const {slug} = useParams();
  const {pathname} = useLocation();
  const isCreate = pathname === '/dash/create';

  //get query
  const {isPending, error, data} = useQuery({
    queryKey: [`${slug}`],
    queryFn: async () => {
      const res = await api.get(`/projects/${slug}`);
      return res.data;
    },
    enabled: !isCreate
  });
  useEffect(() => {
    if(data && data[0]){
      setTitle(data[0].title)
      setGithub(data[0].github)
      setLink(data[0].link)
    }
  }, [data])
  //end get query



  //setup mutations
  const submitMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.post('/projects', formData);
      return res.data;
    },
    onSuccess: () => {
      navigate('/dash');
    },
    onError: (err) => {
      //some sort of error handling.
    }
  });

  const submitEditMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.patch('/projects', formData);
      return res.data;
    },
    onSuccess: () => {
      navigate('/dash')
    },
    onError: (err) => {
      //more error handling
    }
  });
  //end setup mutations



  //setup of react quill
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'bullet' }, {list: 'ordered'}],
    ],
  };
  const {quill, quillRef} = useQuill({modules});

  useEffect(() => {
    if(quill) {
      quill.on('text-change', () => {
        setDescription(quill.root.innerHTML);
      });
    }
  }, [quill])
  useEffect(() => {
    if(data && data[0] && quill){
      quill.root.innerHTML = data[0].description;
      setDescription(data[0].description)
    }
  }, [data, quill])
  //end quill


  //handle functions
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImg(files);
  }

  const handleCancel = () => {
    navigate('/dash');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('github', github)
    formData.append('link', link)
    img.forEach((photo) => formData.append('img', photo));
    formData.append('description', description)
    submitMutation.mutate(formData);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', data[0].id)
    formData.append('title', title)
    formData.append('github', github)
    formData.append('link', link)
    img.forEach((photo) => formData.append('img', photo));
    formData.append('description', description)
    submitEditMutation.mutate(formData)
  }
  //end handle functions

  
  if(pathname === '/dash/create') {
    return (
      <div className='edit-container'>
        <h1 className='edit-page-title'>Create New Project</h1>
        <form onSubmit={handleSubmit} className='edit-form'>
          <input
            className='edit-input'
            placeholder='Title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input
            className='edit-input'
            placeholder='Github Link'
            type='text'
            value={github}
            onChange={(e) => setGithub(e.target.value)} 
          />
          <input
            className='edit-input'
            placeholder='Example Page'
            type='text'
            value={link}
            onChange={(e) => setLink(e.target.value)} 
          />
          <div ref={quillRef} />
          <input
            className='edit-input'
            type='file'
            multiple
            onChange={handleFileChange}
          />
          {img.length > 0 && (
            <div className="photo-preview">
              {img.map((photo, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(photo)}
                  alt="preview"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '10px',
                  }}
                />
              ))}
            </div>
          )}
          <div className='button-container'>
            <button className='edit-submit-btn' type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className='edit-submit-btn' type='submit' disabled={submitMutation.isPending}>
              Create Project
            </button>
          </div>
        </form>
      </div>
    )   
  } else {

    if(isPending){
        return <p>Loading...</p>
    } 
    if(error){
        return <p>Error: {error.message}</p>
    }
    if(!data){
        return null
    }

    return (
      <div className='edit-container'>
        <h1 className='edit-page-title'>Edit Project</h1>
        <form onSubmit={handleEdit} className='edit-form'>
          <input
            className='edit-input'
            placeholder='Title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input
            className='edit-input'
            placeholder='Github Link'
            type='text'
            value={github}
            onChange={(e) => setGithub(e.target.value)} 
          />
          <input
            className='edit-input'
            placeholder='Example Page'
            type='text'
            value={link}
            onChange={(e) => setLink(e.target.value)} 
          />
          <div ref={quillRef} />
          <input
            className='edit-input'
            type='file'
            multiple
            onChange={handleFileChange}
          />
          {img.length > 0 && (
            <div className="photo-preview">
              {img.map((photo, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(photo)}
                  alt="preview"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '10px',
                  }}
                />
              ))}
            </div>
          )}
          <div className='button-container'>
            <button className='edit-submit-btn' type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className='edit-submit-btn' type='submit' disabled={submitEditMutation.isPending}>
              Update Project
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default DashEdit
