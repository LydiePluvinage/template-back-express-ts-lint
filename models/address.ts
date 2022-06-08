import connection from '../db-config.js';
import { ResultSetHeader } from 'mysql2';
import IAddress from '../interfaces/IAddress';

const getAllAddresses = async (sortBy = ''): Promise<IAddress[]> => {
  let sql = 'SELECT * FROM addresses';
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IAddress[]>(sql);
  return results[0];
};

const getAddressById = async (idAddress: number): Promise<IAddress> => {
  const [results] = await connection
    .promise()
    .query<IAddress[]>('SELECT * FROM addresses WHERE id = ?', [idAddress]);
  return results[0];
};

const getAddressByUser = async (idUser: number): Promise<IAddress[]> => {
  const results = await connection
    .promise()
    .query<IAddress[]>('SELECT * FROM addresses WHERE idUser = ?', [idUser]);
  return results[0];
};

const addAddress = async (address: IAddress): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO addresses (address1, address2, postalCode, city, idUser ) VALUES (?, ?, ?, ?, ?)',
      [
        address.address1,
        address.address2,
        address.postalCode,
        address.city,
        address.idUser,
      ]
    );
  return results[0].insertId;
};

const updateAddress = async (
  idAddress: number,
  address: IAddress
): Promise<boolean> => {
  let sql = 'UPDATE addresses SET ';
  const sqlValues: Array<string | number> = [];
  let oneValue = false;

  if (address.address1) {
    sql += 'address1 = ? ';
    sqlValues.push(address.address1);
    oneValue = true;
  }
  if (address.address2) {
    sql += oneValue ? ', address2 = ? ' : ' address2 = ? ';
    sqlValues.push(address.address2);
    oneValue = true;
  }
  if (address.postal_code) {
    sql += oneValue ? ', postalCode = ? ' : ' postalCode = ? ';
    sqlValues.push(address.postalCode);
    oneValue = true;
  }
  if (address.city) {
    sql += oneValue ? ', city = ? ' : ' city = ? ';
    sqlValues.push(address.city);
    oneValue = true;
  }
  if (address.id_user) {
    sql += oneValue ? ', idUser = ? ' : ' idUser = ? ';
    sqlValues.push(address.idUser);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idAddress);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

const deleteAddress = async (idAddress: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM addresses WHERE id = ?', [idAddress]);
  return results[0].affectedRows === 1;
};

const deleteAddressByUser = async (idUser: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM addresses WHERE idUser = ?', [idUser]);
  return results[0].affectedRows > 1;
};

export {
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
  getAddressByUser,
  deleteAddressByUser,
};
