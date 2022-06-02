import { RowDataPacket } from 'mysql2';

export default interface INewsletter extends RowDataPacket {
  id: number;
  email: string;
}