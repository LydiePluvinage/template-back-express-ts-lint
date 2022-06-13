import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IImage from '../interfaces/IImage';
import * as Image from '../models/image';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// >> --- VALIDATE NEW IMAGE (for the POST route) ---
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

// >> --- PUT AN IMAGE (by ID) ---

// ! 1st step : check if the image exists
const imageExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupèrer l'id image de req.params
  const { idImage } = req.params;
  // Vérifier si l'image existe
  try {
    const imageExists = await Image.getImageById(Number(idImage));
    // Si pas d'image => erreur
    if (!imageExists) {
      next(new ErrorHandler(404, `This image does not exist`));
    }
    // Si oui => next()
    else {
      // req.record = image.Exists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// ! 2nd step : update the image
const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idImage } = req.params;
    const imageUpdated = await Image.updateImage(
      Number(idImage),
      req.body as IImage
    );
    if (imageUpdated) {
      const image = await Image.getImageById(Number(idImage));
      res.status(200).send(image); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Image cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// >> --- DELETE AN IMAGE ---
const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupèrer l'id de l'image de req.params
    const { idImage } = req.params;
    // Vérifie if image existe
    const image = await Image.getImageById(Number(idImage));
    const imageDeleted = await Image.deleteImage(Number(idImage));
    if (imageDeleted) {
      res.status(200).send(image); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This image cannot be deleted`);
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
  updateImage,
  imageExists,
  deleteImage,
};
