import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

// define the type of he schema
export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<UserDocument, 'email' | 'firstName' | 'lastName' | 'verified' | 'createdAt' | 'updatedAt' | '_id' | '__v'>
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
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamps: true});

// Define Hooks on the Schema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await hashValue(this.password);
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