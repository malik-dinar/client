import { NextFunction, Request, Response } from "express";
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => any;

const  catchAsync =
  (fn: AsyncRequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
