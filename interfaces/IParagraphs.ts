import { RowDataPacket } from 'mysql2';

export default interface IParagraphs extends RowDataPacket {
  id: number;
  idPage: number;
  description: string;
}