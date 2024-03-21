import mongoose, { Document, Schema } from "mongoose";

interface IMovie extends Document {
  name: string;
  releaseDate: Date;
  averageRating?: number | null;
}

const movieSchema = new Schema<IMovie>(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    averageRating: { type: Number, min: 0, max: 10, default: null },
  },
  { timestamps: true }
);

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
