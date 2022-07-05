import { RowDataPacket } from 'mysql2';

export default interface IProductOrder extends RowDataPacket {
  id: number;
  idProduct: number;
  idOrder: number;
  quantity: number;
}
