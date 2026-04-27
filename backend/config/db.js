import mongoose from 'mongoose';

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB kapcsolat sikeres');
  } catch (error) {
    console.error('MongoDB kapcsolódási hiba:', error.message);
    process.exit(1);
  }
}
