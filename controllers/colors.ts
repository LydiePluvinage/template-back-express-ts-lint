import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IColor from '../interfaces/IColor';
import * as Color from '../models/color';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// >> --- VALIDATE NEW COLOR (for the POST route) ---
const validateColor = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    colorCode: Joi.string().max(255).presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// >> --- GET ALL COLORS ---
const getAllColors = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const colors = await Color.getAllColors(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `colors : 0-${colors.length}/${colors.length + 1}`
    );
    return res.status(200).json(colors);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// >> --- GET COLORS : by ID ---
const getOneColor = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idColor } = req.params;
    const color = await Color.getColorById(Number(idColor));
    color ? res.status(200).json(color) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// >> --- POST A NEW COLOR ---
const addColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idColor = await Color.addColor(req.body as IColor);
    if (idColor) {
      res.status(201).json({ id: idColor, ...req.body });
    } else {
      throw new ErrorHandler(500, `Color cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

// >> --- PUT AN COLOR (by ID) ---

// ! 1st step : check if the color exists
const colorExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupèrer l'id de req.params
  const { idColor } = req.params;
  // Vérifier si la couleur existe
  try {
    const colorExists = await Color.getColorById(Number(idColor));
    // Si pas de couleur => erreur
    if (!colorExists) {
      next(new ErrorHandler(404, `This color does not exist`));
    }
    // Si oui => next()
    else {
      // req.record = color.Exists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// ! 2nd step : update the color
const updateColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idColor } = req.params;
    const colorUpdated = await Color.updateColor(
      Number(idColor),
      req.body as IColor
    );
    if (colorUpdated) {
      const color = await Color.getColorById(Number(idColor));
      res.status(200).send(color); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Color cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllColors,
  getOneColor,
  addColor,
  validateColor,
  updateColor,
  colorExists,
};
