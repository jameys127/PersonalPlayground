const project = require('../models/Project');
const asyncHandler = require('express-async-handler');

//@desc get all projects
//@route GET /projects
//@access Public
const getAllProjects = asyncHandler(async (req, res) => {
    const allProjects = await project.getAllProjects();
    if(allProjects.length === 0){
        return res.status(400).json({message: 'No Projects Found'});
    }
    return res.status(200).json(allProjects);
});

//@desc create new project
//@route POST /projects
//@access Private
const createNewProject = asyncHandler(async (req, res) => {
    const {title, img, description} = req.body;
    if(!title || !Array.isArray(img) || img.length === 0 || !description){
        return res.status(400).json({message: 'Must have all required fields'})
    }
    const duplicateSlug = await project.getProjectByTitleToSlug(title);
    if(duplicateSlug.length !== 0){
        return res.status(409).json({message: 'Duplicate title for slug'});
    }
    const newProject = await project.createProject(title, img, description);
    if(newProject){
        return res.status(201).json({message: `Project ${title} created`});
    }else{
        return res.status(400).json({message: 'Error creating new project'});
    }
});

const deleteProject = asyncHandler(async(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message: 'Project id required'});
    }
    const deleted = await project.deleteProject(id);
    if(deleted === 0){
        return res.status(400).json({message: 'Project not found'});
    }
    return res.status(200).json({message: 'Project successfully deleted'});
});

const updateProject = asyncHandler(async (req, res) => {
    const {id, title, img, description} = req.body;
    if(!id || !title || !Array.isArray(img) || img.length === 0 || !description){
        return res.status(400).json({message: 'All fields required'});
    }
    const projectToUpdate = await project.getProject(id);
    if(projectToUpdate.length === 0){
        return res.status(400).json({message: 'Project not found'});
    }
    const duplicateSlug = await project.getProjectByTitleToSlug(title);
    if(duplicateSlug.length !== 0){
        return res.status(409).json({message: 'Duplicate title for slug'});
    }
    const updatedProject = await project.updateProject(id, title, img, description);
    if(updatedProject === 0){
        return res.status(400).json({message: 'Error updating project'});
    }
    return res.status(200).json({message: `Project ${title} updated successfully`});
});

module.exports = {
    getAllProjects,
    updateProject,
    deleteProject,
    createNewProject
}