import { RowDataPacket } from 'mysql2';

export default interface IUserAddress extends RowDataPacket {
  id: number;
  idUser: number;
  addressLine1 : string;
  addressLine2 : string;
  zipCode : number;
  city : string;
  country : string;
  
}
