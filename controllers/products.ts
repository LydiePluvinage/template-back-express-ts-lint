import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import IProduct from '../interfaces/IProduct';
import * as Product from '../models/product';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';

// validates input
const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    productRef: Joi.string().max(255).presence(required),
    productImage: Joi.string().max(255).presence(required),
    productName: Joi.string().max(200).presence(required),
    productPrice: Joi.number().max(255).presence(required),
    productDesc: Joi.string().optional(),
    productStock: Joi.number().max(255).presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

const getAllProducts = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const products = await Product.getAllProducts(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `products : 0-${products.length}/${products.length + 1}`
    );
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// route GET by id
const getOneProduct = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.getProductById(Number(idProduct));
    product ? res.status(200).json(product) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// adds a product
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idProduct = await Product.addProduct(req.body as IProduct);
    if (idProduct) {
      res.status(201).json({ id: idProduct, ...req.body });
    } else {
      throw new ErrorHandler(500, `Product cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

// puts a product
// checks if product exists
const productExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupèrer l'id product de req.params
  const { idProduct } = req.params;
  // Vérifie if product exists
  try {
    const productExists = await Product.getProductById(Number(idProduct));
    // Si non, => erreur
    if (!productExists) {
      next(new ErrorHandler(404, `This product doesn't exist`));
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
// updates product
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idProduct } = req.params;
    const productUpdated = await Product.updateProduct(
      Number(idProduct),
      req.body as IProduct
    );
    if (productUpdated) {
      const product = await Product.getProductById(Number(idProduct));
      res.status(200).send(product); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Product cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

//delete product
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Récupèrer l'id product de req.params
    const { idProduct } = req.params;
    // Vérifie if product exist
    const product = await Product.getProductById(Number(idProduct));
    const productDeleted = await Product.deleteProduct(Number(idProduct));
    if (productDeleted) {
      res.status(200).send(product); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This product cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  validateProduct,
  productExists,
  updateProduct,
  deleteProduct,
};
