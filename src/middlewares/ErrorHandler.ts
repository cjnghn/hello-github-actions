import { NextFunction, Request, Response, Router } from "express";

export default class ErrorHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.use(this.notFoundError);
    this.router.use(this.internalServerError);
  }

  private notFoundError(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  private internalServerError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
}
