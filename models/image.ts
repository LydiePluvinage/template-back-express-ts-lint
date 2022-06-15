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

// >> --- UPDATE AN IMAGE ---
const updateImage = async (
  idImage: number,
  image: IImage
): Promise<boolean> => {
  let sql = 'UPDATE images SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (image.idPage) {
    sql += oneValue ? ', idPage = ? ' : ' idPage = ? ';
    sqlValues.push(image.idPage);
    oneValue = true;
  }
  if (image.image) {
    sql += oneValue ? ', image = ? ' : ' image = ? ';
    sqlValues.push(image.image);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idImage);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

// >> --- DELETE AN IMAGE ---
const deleteImage = async (idImage: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM images WHERE id = ?', [idImage]);
  return results[0].affectedRows === 1;
};

export { getAllImages, getImageById, addImage, updateImage, deleteImage };
