import { Request, Response } from "express";

function success(res: Response, json: any) {
  res.status(200);
  res.json({
    success: true,
    ...json,
  });
  res.end();
}

function failure(res: Response, e: any) {
  const errorMessage = (e && e.message) || e;
  console.log("--> failure:", errorMessage);
  res.status(400);
  res.json({
    success: false,
    error: errorMessage,
  });
  res.end();
}

function failure200(res: Response, e: any) {
  res.status(200);
  res.json({
    success: false,
    error: (e && e.message) || e,
  });
  res.end();
}

export { success, failure, failure200 };
