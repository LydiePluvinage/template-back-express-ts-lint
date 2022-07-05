import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IPage from '../interfaces/IPage';
import * as Page from '../models/page';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// >> --- VALIDATE NEW PAGE (for the POST route) ---
const validatePage = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// >> --- GET ALL PAGES ---
const getAllPages = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const pages = await Page.getAllPages(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `pages : 0-${pages.length}/${pages.length + 1}`
    );
    return res.status(200).json(pages);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// >> --- GET PAGES : by ID ---
const getOnePage = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idPage } = req.params;
    const page = await Page.getPageById(Number(idPage));
    page ? res.status(200).json(page) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// >> --- POST A NEW PAGE ---
const addPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idPage = await Page.addPage(req.body as IPage);
    if (idPage) {
      res.status(201).json({ id: idPage, ...req.body });
    } else {
      throw new ErrorHandler(500, `Page cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

// >> --- PUT A PAGE (by ID) ---

// ! 1st step : check if the page exists
const pageExists = (async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'id de req.params
  const { idPage } = req.params;
  // Vérifier si la page existe
  try {
    const pageExists = await Page.getPageById(Number(idPage));
    // Si pas de page => erreur
    if (!pageExists) {
      next(new ErrorHandler(404, `This page does not exist`));
    }
    // Si oui => next()
    else {
      // req.record = page.Exists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// ! 2nd step : update the page
const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idPage } = req.params;
    const pageUpdated = await Page.updatePage(
      Number(idPage),
      req.body as IPage
    );
    if (pageUpdated) {
      const page = await Page.getPageById(Number(idPage));
      res.status(200).send(page); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Page cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllPages,
  getOnePage,
  addPage,
  validatePage,
  updatePage,
  pageExists,
};
