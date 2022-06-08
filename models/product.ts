import connection from '../db-config';
import IProduct from '../interfaces/IProduct';


const getAllProducts = async (sortBy = ''): Promise<IProduct[]> => {
    let sql = `SELECT * FROM products`;
    if (sortBy) {
      sql += ` ORDER BY ${sortBy}`;
    }
    const results = await connection.promise().query<IProduct[]>(sql);
    return results[0];
  };


  export {
      getAllProducts,
  };