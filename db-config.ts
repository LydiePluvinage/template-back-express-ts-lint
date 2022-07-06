// importe le package dotenv pour accèder au .env
import 'dotenv/config';
// importe mysql pour se connecter à la base
import mysql, { Pool } from 'mysql2';

// créer l'objet pool
const pool: Pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL || '');

// exporte l'objet pool pour l'utiliser ailleurs
export default pool;
