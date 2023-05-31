const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function landing(req, res) {
  const q = 'SELECT * FROM products';

  db.query(q, (error, data) => {
    return res.json(data);
  });
}