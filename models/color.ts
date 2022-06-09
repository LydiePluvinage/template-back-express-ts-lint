import connection from '../db-config';
import IColor from '../interfaces/IColor';
import { ResultSetHeader } from 'mysql2';

// >> --- GET ALL COLORS ---
const getAllColors = async (sortBy = ''): Promise<IColor[]> => {
  let sql = `SELECT * FROM colors`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IColor[]>(sql);
  return results[0];
};

// >> --- GET COLOR by ID ---
const getColorById = async (idColor: number): Promise<IColor> => {
  const [results] = await connection
    .promise()
    .query<IColor[]>('SELECT * FROM colors WHERE id = ?', [idColor]);
  return results[0];
};

// >> --- POST A NEW COLOR ---
const addColor = async (color: IColor): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO colors (name,colorCode) VALUES (?, ?)',
      [color.name, color.colorCode]
    );
  return results[0].insertId;
};

// >> --- UPDATE AN COLOR ---
const updateColor = async (
  idColor: number,
  color: IColor
): Promise<boolean> => {
  let sql = 'UPDATE colors SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (color.name) {
    sql += oneValue ? ', name = ? ' : ' name = ? ';
    sqlValues.push(color.name);
    oneValue = true;
  }
  if (color.colorCode) {
    sql += oneValue ? ', colorCode = ? ' : ' colorCode = ? ';
    sqlValues.push(color.colorCode);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idColor);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

export { getAllColors, getColorById, addColor, updateColor };
