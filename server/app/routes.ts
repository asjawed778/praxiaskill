import express from "express";
import userRoutes from "./user/user.route";
import courseCategoryRoutes from "./category/category.route";
import courseRoutes from "./course/course.route";
// routes
const router = express.Router();

router.use("/user", userRoutes);
router.use("/course/category", courseCategoryRoutes);
router.use("/course", courseRoutes);


export default router;