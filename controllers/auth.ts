import { Request, Response, NextFunction } from 'express';
import * as User from '../models/user';
import { ErrorHandler } from '../helpers/errors';
import IUserInfo from '../interfaces/IUserInfo';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Joi from 'joi';
import IUser from '../interfaces/IUser';

// validates login input
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(15).required(),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// logs a user
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password = '' } = req.body as IUser;
    const user = await User.getUserByEmail(email);
    if (!user) throw new ErrorHandler(401, 'This user does not exist');
    else {
      const passwordIsCorrect: boolean = await User.verifyPassword(
        password,
        user.password || ''
      );
      if (passwordIsCorrect) {
        const token = calculateToken(email, Number(user.id), user.admin);

        res.cookie(
          'user_token',
          token,
          {
            sameSite: 'none',
            secure: true,
          } // this option is mandatory because frontend and backend have different domains
        );
        res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          admin: user.admin,
          token: token,
        });
      } else throw new ErrorHandler(401, 'Invalid Credentials');
    }
  } catch (err) {
    next(err);
  }
};

const calculateToken = (userEmail = '', idUser = 0, admin = 0) => {
  return jwt.sign(
    { email: userEmail, id: idUser, admin: admin },
    process.env.PRIVATE_KEY as string
  );
};

interface ICookie {
  user_token: string;
}

const getCurrentSession = (req: Request, res: Response, next: NextFunction) => {
  const myCookie = req.cookies as ICookie;
  console.log(myCookie);
  if (!myCookie.user_token && !req.headers.authorization) {
    next(new ErrorHandler(401, 'Unauthorized user, please login'));
  } else {
    const token: string =
      myCookie.user_token || req.headers.authorization || '';
    req.userInfo = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as IUserInfo;
    if (req.userInfo === undefined) {
      next(new ErrorHandler(401, 'Unauthorized user, please login'));
    } else {
      next();
    }
  }
};

const checkSessionPrivileges = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userInfo === undefined || req.userInfo.admin === 0) {
    next(new ErrorHandler(401, 'You must be admin to perform this action'));
  } else {
    next();
  }
};

export default {
  login,
  getCurrentSession,
  checkSessionPrivileges,
  validateLogin,
};
