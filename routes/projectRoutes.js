const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createNewProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;