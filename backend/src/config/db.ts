import mongoose from 'mongoose';
import { MONGO_URI } from '../constants/env';

const connectToDatabse = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connected successfully')
  } catch (err) {
    console.log('Could not connect to databse', err);
    process.exit(1);   // shutdown the server if we cannot connected to DB
  }
}

export default connectToDatabse;