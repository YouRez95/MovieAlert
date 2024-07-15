import mongoose from 'mongoose';
import { NODE_ENV, MONGO_LOCAL, MONGO_CLOUD} from '../constants/env';

const MONGO_URI = NODE_ENV === 'development' ? MONGO_LOCAL : MONGO_CLOUD

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