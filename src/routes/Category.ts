import { createCategoryController } from '../controllers/Category';
import express from "express"
const multer  = require('multer')
const upload = multer()

const router = express.Router()

router.post('/create', upload.none(), createCategoryController)

export {router as CategoryRouter}