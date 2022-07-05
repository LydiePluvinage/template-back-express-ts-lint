import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IParagraph from '../interfaces/IParagraph';
import * as Paragraph from '../models/paragraph';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// >> --- VALIDATE NEW Paragraph (for the POST route) ---
const validateParagraph = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    idPage: Joi.number().presence(required),
    title: Joi.string().max(255).presence(required),
    description: Joi.string().presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// >> --- GET ALL PARAGRAPHS ---
const getAllParagraphs = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const paragraphs = await Paragraph.getAllParagraphs(
      formatSortString(sortBy)
    );

    res.setHeader(
      'Content-Range',
      `paragraph : 0-${paragraphs.length}/${paragraphs.length + 1}`
    );
    return res.status(200).json(paragraphs);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// >> --- GET PARAGRAPHS : by ID ---
const getOneParagraph = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idParagraph } = req.params;
    const paragraph = await Paragraph.getParagraphById(Number(idParagraph));
    paragraph ? res.status(200).json(paragraph) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// >> --- POST A NEW PARAGRAPH ---
const addParagraph = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParagraph = await Paragraph.addParagraph(req.body as IParagraph);
    if (idParagraph) {
      res.status(201).json({ id: idParagraph, ...req.body });
    } else {
      throw new ErrorHandler(500, `Paragraph cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

// >> --- PUT A PARAGRAPH (by ID) ---

// ! 1st step : check if the paragraph exists
const paragraphExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupèrer l'id paragraph de req.params
  const { idParagraph } = req.params;
  // Vérifier si un paragraphe existe
  try {
    const paragraphExists = await Paragraph.getParagraphById(
      Number(idParagraph)
    );
    // Si pas de paragraphe => erreur
    if (!paragraphExists) {
      next(new ErrorHandler(404, `This paragraph does not exist`));
    }
    // Si oui => next()
    else {
      // req.record = paragraph.Exists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// ! 2nd step : update the paragraph
const updateParagraph = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idParagraph } = req.params;
    const paragraphUpdated = await Paragraph.updateParagraph(
      Number(idParagraph),
      req.body as IParagraph
    );
    if (paragraphUpdated) {
      const paragraph = await Paragraph.getParagraphById(Number(idParagraph));
      res.status(200).send(paragraph); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Paragraph cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// >> --- DELETE A PARAGRAPH (by ID) ---
const deleteParagraph = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Récupèrer l'id du paragraph avec req.params
    const { idParagraph } = req.params;
    // Vérifie if paragraph exist
    const paragraph = await Paragraph.getParagraphById(Number(idParagraph));
    const paragraphDeleted = await Paragraph.deleteParagraph(
      Number(idParagraph)
    );
    if (paragraphDeleted) {
      res.status(200).send(paragraph); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This paragraph cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllParagraphs,
  getOneParagraph,
  addParagraph,
  validateParagraph,
  updateParagraph,
  paragraphExists,
  deleteParagraph,
};
