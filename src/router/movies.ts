import { Router } from "express";
import movieController from "../controllers/movies";
const router = Router();

router
  .route("/movies")
  .get(movieController.getAllMovies)
  .post(movieController.addMovie);

router
  .route("/movie/:id")
  .get(movieController.getMovie)
  .delete(movieController.deleteMovie);

router.get("/singleMovie/:id", movieController.getSingleMovie);

export default router;
