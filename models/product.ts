import connection from '../db-config';
import IProduct from '../interfaces/IProduct';
import { ResultSetHeader } from 'mysql2';

const getAllProducts = async (sortBy = ''): Promise<IProduct[]> => {
  let sql = `SELECT * FROM products`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IProduct[]>(sql);
  return results[0];
};

//route by title
const getProductById = async (idProduct: number): Promise<IProduct> => {
  const [results] = await connection
    .promise()
    .query<IProduct[]>('SELECT * FROM products WHERE id = ?', [idProduct]);
  return results[0];
};

//route post
const addProduct = async (product: IProduct): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO products (productRef,productImage,productName,productPrice,productDesc,productStock) VALUES (?, ?, ?, ?,?,?)',
      [
        product.productRef,
        product.productImage,
        product.productName,
        product.productPrice,
        product.productDesc,
        product.productStock,
      ]
    );
  return results[0].insertId;
};

//route PUT

const updateProduct = async (
  idProduct: number,
  product: IProduct
): Promise<boolean> => {
  let sql = 'UPDATE products SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (product.productRef) {
    sql += oneValue ? 'productRef = ? ' : 'productRef = ? ';
    sqlValues.push(product.productRef);
    oneValue = true;
  }
  if (product.productImage) {
    sql += oneValue ? ', productImage = ? ' : ' productImage = ? ';
    sqlValues.push(product.productImage);
    oneValue = true;
  }
  if (product.productName) {
    sql += oneValue ? ', productName = ? ' : ' productName = ? ';
    sqlValues.push(product.productName);
    oneValue = true;
  }
  if (product.productPrice) {
    sql += oneValue ? ', productPrice = ? ' : ' productPrice = ? ';
    sqlValues.push(product.productPrice);
    oneValue = true;
  }
  if (product.productDesc) {
    sql += oneValue ? ', productDesc = ? ' : ' productDesc = ? ';
    sqlValues.push(product.productDesc);
    oneValue = true;
  }
  if (product.productStock) {
    sql += oneValue ? ', productStock = ? ' : ' productStock = ? ';
    sqlValues.push(product.productStock);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idProduct);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//route delete Product

const deleteProduct = async (idProduct: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [idProduct]);
  return results[0].affectedRows === 1;
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
