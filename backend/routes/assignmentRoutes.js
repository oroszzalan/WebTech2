import express from 'express';
import {
  createAssignment,
  getAssignments,
  returnAssignment
} from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/', protect, createAssignment);
router.put('/:id/return', protect, returnAssignment);

export default router;
