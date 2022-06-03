import { RowDataPacket } from 'mysql2';

export default interface IOrder extends RowDataPacket {
  id: number;
  idUser: number;
  idStatus: number;
  orderDate: Date;
  orderTrackingNum: number;
  orderStatus: string;
}
