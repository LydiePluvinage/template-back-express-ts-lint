import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import * as Product from '../models/product';



const getAllProducts = (async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sortBy: string = req.query.sort as string;
      const users = await Product.getAllProducts(formatSortString(sortBy));
  
      res.setHeader(
        'Content-Range',
        `users : 0-${users.length}/${users.length + 1}`
      );
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler; // Used to avoid eslint error 


  export default {
      getAllProducts,

  };