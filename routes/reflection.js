const express = require('express');
const router = express.Router();
const controller = require('../controllers/reflection.controller')
const middleware = require('../middlewares/auth')

router.post('/', middleware.verify, controller.postReflection);
router.get('/', middleware.verify, controller.getReflections);

module.exports = router;