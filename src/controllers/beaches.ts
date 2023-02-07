import { Controller, Post, ClassMiddleware, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import ApiError from '@src/util/errors/api-error';
import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  keyGenerator(req: Request): string {
    return req.ip;
  },
  handler(_, res: Response): void {
    res
      .status(429)
      .send(
        ApiError.format({
          code: 429,
          message: 'Too many requests to the /beaches endpoint',
        })
      );
  },
});

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
  @Post('')
  @Middleware(rateLimiter)
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await beach.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
