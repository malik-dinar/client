import { Request, Response } from "express";
import Movie from "../models/movies";
import Review from "../models/reviews";
import catchAsync from "../utils/catchAsync";
import { Types } from 'mongoose';

const getReviews = catchAsync(async (req: Request, res: Response) => {
  
  if (req.query.search) {
    const reviews = await Review.find({
      reviewComments: { $search: req.query.search as string },
    });
    res.json(reviews);

    return;
  }

  const reviews = await Review.find({
    movieId: new Types.ObjectId(req.params.id),
  });  
  
  res.json(reviews);
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const movieId = req.params.id;
  if (!req.body.name || !req.body.rating || !req.body.review) {
    return res
      .status(400)
      .json({ message: "Name, rating and review comments are required" });
  }
  console.log(req.params.id,req.body);
  
  const newReview = new Review({
    movieId,
    reviewerName: req.body.name,
    rating: req.body.rating,
    reviewComments: req.body.review,
  });
  const savedReview = await newReview.save();
  res.status(201).json(savedReview);
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.json(review);
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.json({ message: "Review deleted" });
});

export default { addReview, updateReview, deleteReview, getReviews };
