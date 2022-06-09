import { RowDataPacket } from 'mysql2';

export default interface IColor extends RowDataPacket {
  id: number;
  name: string;
  colorCode: string;
}