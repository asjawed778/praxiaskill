import express from "express";
import userRoutes from "./user/user.route";
import courseCategoryRoutes from "./category/category.route";
import courseRoutes from "./course/course.route";
import eventRoutes from "./event/event.route";

// routes
const router = express.Router();

router.use("/user", userRoutes);
router.use("/course/category", courseCategoryRoutes);
router.use("/course", courseRoutes);
router.use("/event", eventRoutes);


export default router;