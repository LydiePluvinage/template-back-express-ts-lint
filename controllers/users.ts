import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as User from '../models/user';
import * as Address from '../models/address';
import IUser from '../interfaces/IUser';
import IAddress from '../interfaces/IAddress';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

///////////// USERS ///////////////
// validates inputs
const validateUser = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    firstname: Joi.string().max(100).presence(required),
    lastname: Joi.string().max(100).presence(required),
    email: Joi.string().email().max(255).presence(required),
    password: Joi.string().min(8).max(15).presence(required),
    admin: Joi.number().min(0).max(1).optional(),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// Sends an error if the email is already registered in the database
const emailIsFree = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // get email from req.body
    const { email } = req.body as IUser;
    // Checks if email already belongs to a registered user
    const userExists = await User.getUserByEmail(email);
    // If email isn't free = Send an error
    if (userExists) {
      next(new ErrorHandler(400, `This user already exists`));
    } else {
      // if email is free, next
      next();
    }
  } catch (err) {
    next(err);
  }
};

// get all users
const getAllUsers = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // appelle le modèle pour récupérer tous les users
    const users = await User.getAllUsers();

    // react-admin
    res.setHeader(
      'Content-Range',
      `users : 0-${users.length}/${users.length + 1}`
    );
    // renvoie à l'utilisateur la liste de tous les users
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error : Promise returned in function argument where a void return was expected

// get one user
const getOneUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const user = await User.getUserById(Number(idUser));
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// checks if user exists
const userExists = (async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'id user de req.params
  const { idUser } = req.params;
  // Vérifier si le user existe
  try {
    const userExists = await User.getUserById(Number(idUser));
    // Si non, => erreur
    if (!userExists) {
      next(new ErrorHandler(404, `This user doesn't exist`));
    }
    // Si oui => next
    else {
      req.record = userExists; // because we need deleted record to be sent after a delete in react-admin
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// adds a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUser;
    user.id = await User.addUser(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// updates a user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const userUpdated = await User.updateUser(
      Number(idUser),
      req.body as IUser
    );
    if (userUpdated) {
      const user = await User.getUserById(Number(idUser));
      res.status(200).send(user); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `User cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// delete one user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupèrer l'id user de req.params
    const { idUser } = req.params;
    // Vérifier si le user existe
    const user = await User.getUserById(Number(idUser));
    const userDeleted = await User.deleteUser(Number(idUser));
    if (userDeleted) {
      res.status(200).send(user); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This user cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

////////// ADDRESSES BY USER
const getAddressesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params;

    const addresses: IAddress[] = await Address.getAddressByUser(
      Number(idUser)
    );
    res.status(200).json(addresses);
  } catch (err) {
    next(err);
  }
};

const deleteAddressesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params;

    const addressesDeleted = await Address.deleteAddressByUser(Number(idUser));
    if (addressesDeleted) {
      res.status(200).send('Addresses deleted');
    } else {
      throw new ErrorHandler(500, `Addresses cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  getOneUser,
  userExists,
  emailIsFree,
  deleteUser,
  validateUser,
  addUser,
  updateUser,
  getAddressesByUser,
  deleteAddressesByUser,
};
