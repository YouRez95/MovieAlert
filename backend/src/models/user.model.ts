import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

// define the type of he schema
export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  badge: number;
  moviesViewed: number;
  moviesSubmitted: number;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<UserDocument, 'email' | 'firstName' | 'lastName' | 'verified' | 'createdAt' | 'updatedAt' | '_id' | '__v'>;
}

// Create the Schema
const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  badge: {
    type: Number,
    default: 1
  },
  moviesViewed: {
    type: Number,
    default: 0
  },
  moviesSubmitted: {
    type: Number,
    default: 0
  },
}, {timestamps: true});

// Define Hooks on the Schema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await hashValue(this.password);
  next();
})

userSchema.pre('save', async function (next) {

  if (!this.isModified('moviesSubmitted')) {
    return next();
  }

  switch(this.moviesSubmitted){
    case 1:
      this.badge = this.badge + 1;
      break;
    case 4:
      this.badge = this.badge + 1;
      break;
    case 9:
      this.badge = this.badge + 1;
      break;
  }
  next();
})


// Define methods on the Schema
userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
}

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}


const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel;