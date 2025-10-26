import express from "express";
import { addFeaturedImage, deleteFeaturedImage, fetchFeaturedImages } from "../controllers/dashboard.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/featured-images", fetchFeaturedImages);
router.post("/featured-images", upload.single("featureImage"), addFeaturedImage);
router.delete("/featured-images/:id", deleteFeaturedImage);

export default router;