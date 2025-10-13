const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT);

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createNewProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;