import { RowDataPacket } from 'mysql2';

export default interface IProduct extends RowDataPacket {
  id: number;
  productRef: string;
  productImage : string;
  productName : string;
  productPrice : number;
  productDesc : string;
  productStock : number;
  
  
}
