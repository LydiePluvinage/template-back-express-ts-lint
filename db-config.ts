import 'dotenv/config';
import mysql, { Pool } from 'mysql2';

const connection: Pool = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
