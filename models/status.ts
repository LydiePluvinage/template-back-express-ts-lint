import connection from '../db-config';
import IStatus from '../interfaces/IStatus';
import { ResultSetHeader } from 'mysql2';

const getAllStatus = async (sortBy = ''): Promise<IStatus[]> => {
  let sql = `SELECT * FROM status`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IStatus[]>(sql);
  return results[0];
};

const getStatusById = async (idStatus: number): Promise<IStatus> => {
  const [results] = await connection
    .promise()
    .query<IStatus[]>('SELECT id, name FROM status WHERE id = ?', [idStatus]);
  return results[0];
};
const addStatus = async (status: IStatus): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('INSERT INTO status (name) VALUES (?)', [
      status.name,
    ]);
  return results[0].insertId;
};

const updateStatus = async (
  idStatus: number,
  status: IStatus
): Promise<boolean> => {
  let sql = 'UPDATE status SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (status.name) {
    sql += oneValue ? 'name = ? ' : 'name = ?';
    sqlValues.push(status.name);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idStatus);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

export { getAllStatus, getStatusById, addStatus, updateStatus };
