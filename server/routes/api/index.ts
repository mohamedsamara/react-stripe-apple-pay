import * as express from "express";

import userRoutes from "./user";
import checkoutRoutes from "./checkout";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/checkout", checkoutRoutes);

export default router;
