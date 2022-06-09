import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import { ErrorHandler } from '../helpers/errors';
import IStatus from '../interfaces/IStatus';
import * as Status from '../models/status';

const getAllStatus = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const users = await Status.getAllStatus(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `users : 0-${users.length}/${users.length + 1}`
    );
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// get one status
const getOneStatus = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idStatus } = req.params;
    const status = await Status.getStatusById(Number(idStatus));
    status ? res.status(200).json(status) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// adds a status
const addStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.body as IStatus;
    status.id = await Status.addStatus(status);
    res.status(201).json(status);
  } catch (err) {
    next(err);
  }
};

// updates a status
const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idStatus } = req.params;
    const statusUpdated = await Status.updateStatus(
      Number(idStatus),
      req.body as IStatus
    );
    if (statusUpdated) {
      const status = await Status.getStatusById(Number(idStatus));
      res.status(200).send(status); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Status cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllStatus,
  getOneStatus,
  addStatus,
  updateStatus,
};
