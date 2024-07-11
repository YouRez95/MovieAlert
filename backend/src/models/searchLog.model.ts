import mongoose from "mongoose";


export interface SearchLogDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  movieId: mongoose.Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}


const searchLogSchema = new mongoose.Schema<SearchLogDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
}, {timestamps: true});



const SearchLogModel = mongoose.model<SearchLogDocument>("SearchLog", searchLogSchema, 'search_logs');

export default SearchLogModel;