import { Router } from "express";
import reviewController from "../controllers/reviews";
const router = Router();

router.get("/reviews/:id", reviewController.getReviews);

router
  .route("/review/:id")
  .post(reviewController.addReview)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default router;
