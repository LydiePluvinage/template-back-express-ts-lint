import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import INewsletter from '../interfaces/INewsletter';
import * as Newsletter from '../models/newsletter';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// validates input
const validateNewsletter = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    email: Joi.string().max(255).presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

const getAllNewsletters = (async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sortBy: string = req.query.sort as string;
      const newsletters = await Newsletter.getAllNewsletters(formatSortString(sortBy));
  
      res.setHeader(
        'Content-Range',
        `newsletters : 0-${newsletters.length}/${newsletters.length + 1}`
      );
      return res.status(200).json(newsletters);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler; // Used to avoid eslint error
  
  // route GET by id
  const getOneNewsletter = (async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { idNewsletter } = req.params;
      const newsletter = await Newsletter.getNewsletterById(Number(idNewsletter));
      newsletter ? res.status(200).json(newsletter) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  //route POST
  const addNewsletter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idNewsletter = await Newsletter.addNewsletter(req.body as INewsletter);
      if (idNewsletter) {
        res.status(201).json({ id: idNewsletter, ...req.body });
      } else {
        throw new ErrorHandler(500, `Newsletter cannot be created`);
      }
    } catch (err) {
      next(err);
    }
  };

  // put a email for newsletter
// checks if email for newsletter exists
const newsletterExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idNewsletter } = req.params;
  try {
    const newsletterExists = await Newsletter.getNewsletterById(Number(idNewsletter));
    // Si non, => erreur
    if (!newsletterExists) {
      next(new ErrorHandler(404, `This email of newsletter doesn't exist`));
    }
    // Si oui => next
    else {
      // req.record = productExists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;
// updates email of Newsletter
const updateNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idNewsletter } = req.params;
    const newsletterUpdated = await Newsletter.updateNewsletter(
      Number(idNewsletter),
      req.body as INewsletter
    );
    if (newsletterUpdated) {
      const newsletter = await Newsletter.getNewsletterById(Number(idNewsletter));
      res.status(200).send(newsletter); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Email of newsletter cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
  };
//delete email of newsletter
const deleteNewsletter = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const { idNewsletter } = req.params;
    const newsletter = await Newsletter.getNewsletterById(Number(idNewsletter));
    const newsletterDeleted = await Newsletter.deleteNewsletter(Number(idNewsletter));
    if (newsletterDeleted) {
      res.status(200).send(newsletter); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This email of newsletter cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

  export default {
    getAllNewsletters,
    getOneNewsletter,
    addNewsletter,
    validateNewsletter,
    newsletterExists,
    updateNewsletter,
    deleteNewsletter
  };