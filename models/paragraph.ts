import connection from '../db-config';
import IParagraph from '../interfaces/IParagraph';
import { ResultSetHeader } from 'mysql2';

// >> --- GET ALL PARAGRAPHS ---
const getAllParagraphs = async (sortBy = ''): Promise<IParagraph[]> => {
  let sql = `SELECT * FROM paragraphs`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IParagraph[]>(sql);
  return results[0];
};

// >> --- GET PARAGRAPH by ID ---
const getParagraphById = async (idParagraph: number): Promise<IParagraph> => {
  const [results] = await connection
    .promise()
    .query<IParagraph[]>('SELECT * FROM paragraphs WHERE id = ?', [
      idParagraph,
    ]);
  return results[0];
};

// >> --- POST A NEW PARAGRAPH ---
const addParagraph = async (paragraph: IParagraph): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO paragraphs (idPage, title, description) VALUES (?, ?, ?)',
      [paragraph.idPage, paragraph.title, paragraph.description]
    );
  return results[0].insertId;
};

// >> --- UPDATE A PARAGRAPH ---
const updateParagraph = async (
  idParagraph: number,
  paragraph: IParagraph
): Promise<boolean> => {
  let sql = 'UPDATE paragraphs SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (paragraph.idPage) {
    sql += oneValue ? ', idPage = ? ' : ' idPage = ? ';
    sqlValues.push(paragraph.idPage);
    oneValue = true;
  }
  if (paragraph.title) {
    sql += oneValue ? ', title = ? ' : ' title = ? ';
    sqlValues.push(paragraph.title);
    oneValue = true;
  }
  if (paragraph.description) {
    sql += oneValue ? ', description = ? ' : ' description = ? ';
    sqlValues.push(paragraph.description);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idParagraph);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

// >> --- DELETE A PARAGRAPH ---
const deleteParagraph = async (idParagraph: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM paragraphs WHERE id = ?', [
      idParagraph,
    ]);
  return results[0].affectedRows === 1;
};

export {
  getAllParagraphs,
  getParagraphById,
  addParagraph,
  updateParagraph,
  deleteParagraph,
};
