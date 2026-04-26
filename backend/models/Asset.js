import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Az eszköz neve kötelező'],
      trim: true
    },
    serialNumber: {
      type: String,
      required: [true, 'A gyári szám kötelező'],
      unique: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'A kategória kötelező']
    },
    purchaseDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['available', 'assigned', 'repair', 'retired'],
      default: 'available'
    },
    location: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export const Asset = mongoose.model('Asset', assetSchema);
