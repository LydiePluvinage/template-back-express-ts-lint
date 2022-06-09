import { RowDataPacket } from 'mysql2';

export default interface IStatus extends RowDataPacket {
  id: number;
  name: string;
}