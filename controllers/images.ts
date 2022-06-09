import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IImage from '../interfaces/IImage';
import * as Image from '../models/image';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// >> --- VALIDATE NEW IMAGE ---
const validateImage = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    idPage: Joi.number().presence(required),
    image: Joi.string().max(255).presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// >> --- GET ALL IMAGES ---
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

// >> --- GET IMAGES : by ID ---
const getOneImage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idImage } = req.params;
    const image = await Image.getImageById(Number(idImage));
    image ? res.status(200).json(image) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// >> --- POST A NEW IMAGE ---
const addImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idImage = await Image.addImage(req.body as IImage);
    if (idImage) {
      res.status(201).json({ id: idImage, ...req.body });
    } else {
      throw new ErrorHandler(500, `Image cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllImages,
  getOneImage,
  addImage,
  validateImage,
};
