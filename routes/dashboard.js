import express from "express";
import { addFeaturedImage, deleteFeaturedImage, fetchFeaturedImages, getDashboardStats } from "../controllers/dashboard.js";
import { upload } from "../middlewares/multer.js";
import { authenticateAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/stats", authenticateAdmin, getDashboardStats);
router.get("/featured-images", fetchFeaturedImages);
router.post("/featured-images", authenticateAdmin, upload.single("featureImage"), addFeaturedImage);
router.delete("/featured-images/:id", authenticateAdmin, deleteFeaturedImage);

export default router;