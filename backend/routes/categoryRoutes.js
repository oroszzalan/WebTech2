import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCategories);
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;


//kategóriák listázás létrehozás törlés