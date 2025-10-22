import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import {useQuill} from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import './DashEdit.css'
import { useMutation } from '@tanstack/react-query'
import api from '../../app/api/api'

const DashEdit = () => {
  const [title, setTitle] = useState('');
  const [github, setGithub] = useState('');
  const [example, setExample] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState([]);
  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImg(files);
  }

  const handleCancel = () => {
    navigate('/dash');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate({title, github, example, img, description})
    // const formData = new FormData();
    // formData.append('title', title)
    // formData.append('github', github)
    // formData.append('example', example)
    // formData.append('description', description)
    // img.forEach((photo) => formData.append('img', photo));
    // console.log('form submitted', {title, github, example, description, img});
  }

  const submitMutation = useMutation({
    mutationFn: async ({title, github, example, img, description}) => {
      const res = await api.post('/projects', {title, github, example, img, description})
    }
  })


  const {pathname} = useLocation();
  if(pathname === '/dash/create') return <p>create</p>

  


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
          value={example}
          onChange={(e) => setExample(e.target.value)} 
        />
        <div ref={quillRef} />
        {/* <textarea
          className='edit-textarea'
          placeholder='Description'
          rows='6'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
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
          <button className='edit-submit-btn' type='submit'>
            Save Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default DashEdit
