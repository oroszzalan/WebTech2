import express from 'express';
import {
  createAsset,
  deleteAsset,
  getAssetById,
  getAssets,
  updateAsset
} from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAssets);
router.get('/:id', protect, getAssetById);
router.post('/', protect, createAsset);
router.put('/:id', protect, updateAsset);
router.delete('/:id', protect, deleteAsset);

export default router;
