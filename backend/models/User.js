import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A név kötelező'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Az email kötelező'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Hibás email formátum']
    },
    password: {
      type: String,
      required: [true, 'A jelszó kötelező'],
      minlength: [6, 'A jelszónak legalább 6 karakteresnek kell lennie']
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
