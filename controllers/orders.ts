import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formatSortString } from '../helpers/functions';
import * as Order from '../models/order';
import IOrder from '../interfaces/IOrder';
import { ErrorHandler } from '../helpers/errors';

// route get all orders
const getAllOrders = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const orders = await Order.getAllOrders(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `orders : 0-${orders.length}/${orders.length + 1}`
    );
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error

// route get by Id
const getOrderById = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idOrder } = req.params;
    const order = await Order.getOrderById(Number(idOrder));
    order ? res.status(200).json(order) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// add an order
const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idOrder = await Order.addOrder(req.body as IOrder);
    if (idOrder) {
      res.status(201).json({ id: idOrder, ...req.body });
    } else {
      throw new ErrorHandler(500, `Order cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllOrders,
  getOrderById,
  addOrder,
};
