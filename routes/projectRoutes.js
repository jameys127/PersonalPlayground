const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage});

const verifyJWT = require('../middleware/verifyJWT')


router.route('/').get(projectController.getAllProjects)

router.route('/:slug')
    .get(projectController.getProjectBySlug)

router.use(verifyJWT);


router.route('/')
    .post(upload.array('img'), projectController.createNewProject)
    .patch(upload.array('img'), projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;