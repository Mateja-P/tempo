const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function categories(req, res) {
  res.send([
    {
      id: 1,
      category: 'Odeca',
    },
    {
      id: 2,
      category: 'Solje',
    },
  ]);
  // const q = 'SELECT * FROM categories';

  // db.query(q, (error, data) => {
  //   return res.json(data);
  // });
}
