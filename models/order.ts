import connection from '../db-config';
import IOrder from '../interfaces/IOrder';
import { ResultSetHeader } from 'mysql2';

const getAllOrders = async (sortBy = ''): Promise<IOrder[]> => {
  let sql = `SELECT * FROM orders`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IOrder[]>(sql);
  return results[0];
};

const getOrderById = async (idOrder: number): Promise<IOrder> => {
  const [results] = await connection
    .promise()
    .query<IOrder[]>(`SELECT * FROM orders WHERE id = ?`, [idOrder]);
  return results[0];
};

//route post
const addOrder = async (order: IOrder): Promise<number> => {
  const results = await connection.promise().query<ResultSetHeader>(
    `INSERT INTO orders (idUser,idStatus,idAddress,orderDate,orderTrackingNum,orderStatus) 
      VALUES (?, ?, ?, NOW(), 2, 1)`,
    [order.idUser, order.idStatus, order.idAddress]
  );
  return results[0].insertId;
};

export { getAllOrders, getOrderById, addOrder };
