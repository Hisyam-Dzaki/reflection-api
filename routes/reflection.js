const express = require('express');
const router = express.Router();
const controller = require('../controllers/reflection.controller')
const middleware = require('../middlewares/auth')

router.post('/', middleware.verify, controller.postReflection);
router.get('/', middleware.verify, controller.getReflections);
router.put('/:id', middleware.verify, controller.putReflections);
router.delete('/:id', middleware.verify, controller.deleteReflections);

module.exports = router;