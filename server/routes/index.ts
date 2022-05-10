import * as express from "express";

import config from "@config/keys";
import apiRoutes from "./api/index";

const router = express.Router();

const api = `${config.api_url}`;

// api routes
router.use(api, apiRoutes);

router.use(api, (req, res) => res.status(404).json("No API route found"));

export default router;
