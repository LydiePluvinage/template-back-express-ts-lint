import connection from '../db-config';
import INewsletter from '../interfaces/INewsletter';
import { ResultSetHeader } from 'mysql2';


const getAllNewsletters = async (sortBy = ''): Promise<INewsletter[]> => {
    let sql = `SELECT * FROM newsletters`;
    if (sortBy) {
      sql += ` ORDER BY ${sortBy}`;
    }
    const results = await connection.promise().query<INewsletter[]>(sql);
    return results[0];
  };
  
  //route by title
  const getNewsletterById = async (idNewsletter: number): Promise<INewsletter> => {
    const [results] = await connection
      .promise()
      .query<INewsletter[]>('SELECT * FROM newsletters WHERE id = ?', [idNewsletter]);
    return results[0];
  };

  //route post
const addNewsletter = async (newsletter: INewsletter): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO newsletters (email) VALUES (?)',
      [ newsletter.email ]
    );
  return results[0].insertId;
};

//route PUT

const updateNewsletter = async (
  idNewsletter: number,
  newsletter: INewsletter
): Promise<boolean> => {
  let sql = 'UPDATE newsletters SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (newsletter.email) {
    sql += oneValue ? 'email = ? ' : 'email = ? ';
    sqlValues.push(newsletter.email);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idNewsletter);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//route delete 
const deleteNewsletter = async (idNewsletter: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM newsletters WHERE id = ?', [idNewsletter]);
  return results[0].affectedRows === 1;
};


  export {
    getAllNewsletters,getNewsletterById,addNewsletter,updateNewsletter,deleteNewsletter,
};
  