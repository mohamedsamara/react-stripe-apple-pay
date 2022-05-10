import * as express from "express";

import { success, failure } from "@utils/responder";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  try {
    const {} = req.body;

    //   if (!) {
    //     throw new Error('Missing parameters.');
    //   }

    success(res, {});
  } catch (error) {
    failure(res, error);
  }
});

export default router;
