import connection from '../db-config';
import IImage from '../interfaces/IImage';
import { ResultSetHeader } from 'mysql2';

// >> --- GET ALL IMAGES ---
const getAllImages = async (sortBy = ''): Promise<IImage[]> => {
  let sql = `SELECT * FROM images`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IImage[]>(sql);
  return results[0];
};

// >> --- GET IMAGE by ID ---
const getImageById = async (idImage: number): Promise<IImage> => {
  const [results] = await connection
    .promise()
    .query<IImage[]>('SELECT * FROM images WHERE id = ?', [idImage]);
  return results[0];
};

// >> --- POST A NEW IMAGE ---
const addImage = async (image: IImage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('INSERT INTO images (idPage,image) VALUES (?, ?)', [
      image.idPage,
      image.image,
    ]);
  return results[0].insertId;
};

export { getAllImages, getImageById, addImage };
