import connection from '../db-config';
import IImage from '../interfaces/IImage';

const getAllImages = async (sortBy = ''): Promise<IImage[]> => {
  let sql = `SELECT * FROM images`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IImage[]>(sql);
  return results[0];
};

export { getAllImages };
