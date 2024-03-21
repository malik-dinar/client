import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
    movieId: mongoose.Schema.Types.ObjectId;
    reviewerName?: string;
    rating: number;
    reviewComments: string;
}

const ReviewSchema = new Schema<IReview>({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    reviewerName: { type: String },
    rating: { type: Number, required: true, min: 0, max: 10 },
    reviewComments: { type: String, required: true },
}, { timestamps: true });

const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;