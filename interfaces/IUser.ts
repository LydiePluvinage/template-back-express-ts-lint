import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
  id: number;
  admin: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  created: Date;
  phone: number;
  modified: Date;
  
}
