import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  hashedPassword?: string;
  password?: string;
  language: string;
  admin: number;
}
