import mongoose from "mongoose";


export interface MovieDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  year: string;
  genre: string,
  picture: string,
  contentWarning: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


const movieSchema = new mongoose.Schema<MovieDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true},
  title: {type: String, required: true, index: true},
  year: {type: String, required: true},
  genre: {type: String, required: true},
  picture: {type: String, required: true},
  contentWarning: {type: [String]},
  description: {type: String, required: true},
}, {timestamps: true});


const MovieModel = mongoose.model<MovieDocument>("Movie", movieSchema);

export default MovieModel;