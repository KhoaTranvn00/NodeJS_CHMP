const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/category' })

const controller = require('../../controllers/admin/category.controller');


router.get('/', controller.index)
router.get('/add', controller.getAdd)
router.post('/add', upload.single('img'), controller.postAdd)
router.delete('/:id', controller.delete)
router.get('/:slug/edit', controller.getEdit)
router.put('/:id/edit', upload.single('img'), controller.putEdit)



module.exports = router;
