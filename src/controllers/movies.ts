import { Request, Response } from "express";
import Movie from "../models/movies";
import Review from "../models/reviews";
import catchAsync from "../utils/catchAsync";

const getAllMovies = catchAsync(async (req: Request, res: Response) => {
  const aggregation = [
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "movieId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
      },
    },
    {
      $project: {
        reviews: 0,
      },
    },
  ];

  const movies = await Movie.aggregate(aggregation);
  res.json(movies);
  console.log(movies);
});

const addMovie = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.releaseDate) {
    return res
      .status(400)
      .json({ error: "Name and release date are required" });
  }
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.status(201).json(savedMovie);
});

const getMovie = catchAsync(async (req: Request, res: Response) => {
  const searchQuery = req.params.id;

  const regex = new RegExp(searchQuery, "i");

  const movie = await Movie.find({ name: { $regex: regex } });

  if (!movie || movie.length === 0) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

const deleteMovie = catchAsync(async (req: Request, res: Response) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  await Review.deleteMany({ movieId: req.params.id });
  res.json({ message: "Movie deleted successfully" });
});

const getSingleMovie = catchAsync(async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

export default {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  getSingleMovie,
};
