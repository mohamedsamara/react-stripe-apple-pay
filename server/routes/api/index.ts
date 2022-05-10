import * as express from "express";

import userRoutes from "./user";

const router = express.Router();

router.use("/user", userRoutes);
// router.use('/checkout', checkoutRutes);

export default router;
