import { NextFunction, Request, Response, Router } from 'express';
export const IndexController: Router = Router();

IndexController.get('/', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    res.status(200).send({ data: 'Image Processing API' });
  } catch (e) {
    next(e);
  }
});
