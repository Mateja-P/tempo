// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { mysql } from 'mysql';
const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function show(req, res) {
  const q = 'SELECT * FROM shopped ORDER by id DESC';

  db.query(q, (error, data) => {
    return res.json(data);
  });
}
