import { RowDataPacket } from 'mysql2';

export default interface IOrder extends RowDataPacket {
  id: number;
  idUser: string;
  orderDate: Date;
  orderTrackingNum: number;
  orderStatus: string;
  
}
