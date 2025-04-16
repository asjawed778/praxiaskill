import express from "express";
import userRoutes from "./user/user.route";
import courseCategoryRoutes from "./category/category.route";
import courseRoutes from "./course/course.route";
import eventRoutes from "./event/event.route";
import paymentRoutes from "./payment/payment.route";
import generalRoutes from "./general/general.routes";

// routes
const router = express.Router();

router.use("/user", userRoutes);
router.use("/course/category", courseCategoryRoutes);
router.use("/course", courseRoutes);
router.use("/event", eventRoutes);
router.use("/payment", paymentRoutes);
router.use("/", generalRoutes);


export default router;