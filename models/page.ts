import connection from '../db-config';
import IPage from '../interfaces/IPage';
import { ResultSetHeader } from 'mysql2';

// >> --- GET ALL PAGES ---
const getAllPages = async (sortBy = ''): Promise<IPage[]> => {
  let sql = `SELECT * FROM pages`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IPage[]>(sql);
  return results[0];
};

// >> --- GET PAGE by ID ---
const getPageById = async (idPage: number): Promise<IPage> => {
  const [results] = await connection
    .promise()
    .query<IPage[]>('SELECT * FROM pages WHERE id = ?', [idPage]);
  return results[0];
};

// >> --- POST A NEW PAGE ---
const addPage = async (page: IPage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('INSERT INTO pages (name) VALUES (?)', [
      page.name,
    ]);
  return results[0].insertId;
};

// >> --- UPDATE A PAGE ---
const updatePage = async (idPage: number, page: IPage): Promise<boolean> => {
  let sql = 'UPDATE pages SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (page.name) {
    sql += oneValue ? ', name = ? ' : ' name = ? ';
    sqlValues.push(page.name);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idPage);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

export { getAllPages, getPageById, addPage, updatePage };
