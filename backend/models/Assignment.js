import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true
    },
    assigneeName: {
      type: String,
      required: [true, 'A felhasználó neve kötelező'],
      trim: true
    },
    assigneeEmail: {
      type: String,
      required: [true, 'A felhasználó email címe kötelező'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Hibás email formátum']
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    returnedAt: {
      type: Date,
      default: null
    },
    note: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
