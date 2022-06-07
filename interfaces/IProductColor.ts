import { RowDataPacket } from 'mysql2';

export default interface IProductColor extends RowDataPacket {
  id: number;
  idColor: number;
  idProduct: number;
}