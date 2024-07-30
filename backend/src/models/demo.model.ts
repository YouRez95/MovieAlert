import mongoose from "mongoose";


export interface DemoDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}


const demoSchema = new mongoose.Schema<DemoDocument>({
  user_id: { type: String, index: true, required: true},
}, {timestamps: true});


const DemoModel = mongoose.model<DemoDocument>("Demo", demoSchema);

export default DemoModel;