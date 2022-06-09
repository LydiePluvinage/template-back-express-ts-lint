import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import * as Image from '../models/image';

const getAllImages = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const images = await Image.getAllImages(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `images : 0-${images.length}/${images.length + 1}`
    );
    return res.status(200).json(images);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

export default {
  getAllImages,
};
