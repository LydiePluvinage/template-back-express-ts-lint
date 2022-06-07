import { RowDataPacket } from 'mysql2';

export default interface IImage extends RowDataPacket {
  id: number;
  idPage: number;
  image: string;
}