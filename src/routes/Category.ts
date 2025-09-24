import { createCategoryController, getCategoryController, updateCategoryController } from '../controllers/Category';
import express from "express"
const multer  = require('multer')
const upload = multer()

const router = express.Router()

router.get('/', upload.none(), getCategoryController)
router.post('/create', upload.none(), createCategoryController)
router.post('/update/:id', upload.none(), updateCategoryController)

export {router as CategoryRouter}