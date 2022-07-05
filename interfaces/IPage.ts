import { RowDataPacket } from 'mysql2';

export default interface IPage extends RowDataPacket {
  id: number;
  name: string;
}
