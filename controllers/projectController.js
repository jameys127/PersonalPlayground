const project = require('../models/Project');
const asyncHandler = require('express-async-handler');
const {PutObjectCommand, DeleteObjectsCommand} = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

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
    const {title, github, link, short, description} = req.body;
    const imageFiles = req.files;

    if(!title || !github || !link || !short || !imageFiles || imageFiles.length === 0 || !description){
        return res.status(400).json({message: 'Must fill all required fields'})
    }

    const duplicateSlug = await project.getProjectByTitleToSlug(title);
    if(duplicateSlug.length !== 0){
        return res.status(409).json({message: 'Duplicate title for slug'});
    }

    //later setup for s3 uploading of the files
    const img = [];
    try{
    for (const file of imageFiles){
        const key = `projects/${Date.now()}-${file.originalname}`
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        await s3.send(new PutObjectCommand(params));

        const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        img.push(url);
    }
    }catch (err){
        return res.status(500).json({message: `Failed to upload to s3: ${err.message}`})
    }

    const newProject = await project.createProject(title, github, link, short, img, description);
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
    const projectToDelete = await project.getProject(id);
    const oldImages = projectToDelete[0].images;
    const objects = oldImages.map((url) => {
        const oldKey = url.split('.amazonaws.com/')[1];
        return {Key: oldKey};
    });
    try{
        await s3.send(
            new DeleteObjectsCommand({
                Bucket: BUCKET_NAME,
                Delete: {Objects: objects}
            })
        )
    }catch(err){
        console.error(err.message)
        return res.status(500).json({message: 'Failed to replace images. Please try again'})
    }
    // delete images in s3
    const deleted = await project.deleteProject(id);
    if(deleted === 0){
        return res.status(400).json({message: 'Project not found'});
    }
    return res.status(200).json({message: 'Project successfully deleted'});
});

const updateProject = asyncHandler(async (req, res) => {
    const {id, title, github, link, short, description} = req.body;
    const imageFiles = req.files
    if(!id || !title || !github || !link || !imageFiles || imageFiles.length === 0 || !description){
        return res.status(400).json({message: 'All fields required'});
    }
    const projectToUpdate = await project.getProject(id);
    if(projectToUpdate.length === 0){
        return res.status(400).json({message: 'Project not found'});
    }
    const duplicateSlug = await project.getProjectByTitleToSlug(title);
    if(duplicateSlug.length === 1 && duplicateSlug[0].id !== Number(id)){
        return res.status(409).json({message: 'Duplicate title for slug'});
    }

    //delete and replace the pictures in the s3
    const oldImages = projectToUpdate[0].images;
    const s3Deletion = oldImages.every(p => p.startsWith('https'));
    if(s3Deletion){
        const objects = oldImages.map((url) => {
            const oldKey = url.split('.amazonaws.com/')[1];
            return {Key: oldKey};
        });
        try{
            await s3.send(
                new DeleteObjectsCommand({
                    Bucket: BUCKET_NAME,
                    Delete: {Objects: objects}
                })
            )
        }catch(err){
            console.error(err.message)
            return res.status(500).json({message: 'Failed to replace images. Please try again'})
        }
    }

    const img = [];
    try{
        for (const file of imageFiles){
            const key = `projects/${Date.now()}-${file.originalname}`
            const params = {
                Bucket: BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            await s3.send(new PutObjectCommand(params));

            const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
            img.push(url);
        }
    }catch (err){
        return res.status(500).json({message: `Failed to upload to s3: ${err.message}`})
    }

    const updatedProject = await project.updateProject(id, title, github, link, short, img, description);
    if(updatedProject === 0){
        return res.status(400).json({message: 'Error updating project'});
    }
    return res.status(200).json({message: `Project ${title} updated successfully`});
});

const getProjectBySlug = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    if(!slug){
        return res.status(400).json({message: 'All fields required'});
    }
    const projectData = await project.getProjectBySlug(slug);
    if(projectData.length === 0){
        return res.status(404).json({message: 'No project found'});
    }
    return res.status(200).json(projectData);
})

module.exports = {
    getAllProjects,
    updateProject,
    deleteProject,
    createNewProject,
    getProjectBySlug
}