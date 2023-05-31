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

export default function proizvodi(req, res) {
  res.send([
    {
      categories_id: 1,
      id: 1,
      information: 'Majca je 100% od pamuka. Najmanja kolicina je 1 komad',
      model: 'shirtmodel.glb',
      modelName: 'Majca kratkih rukava',
      mostPopular: 'true',
      price: '1450',
      printPrice: '160',
      productsImage:
        '{"properties": ["premium1801.png", "premium1802.png", "premium1803.png"]}',
      promoId: 'Premium',
    },
    {
      categories_id: 2,
      id: 2,
      information:
        'Solja je napravljena od nerdjajuceg celika. Najmanja kolicina je 1 komad',
      model: 'metalCup.glb',
      modelName: 'Metalna solja',
      mostPopular: 'true',
      price: '900',
      printPrice: '160',
      productsImage: '{"properties": ["nepalsubli1.png", "nepalsubli2.png"]}',
      promoId: 'Nepal subli',
    },
  ]);

  // const q = 'SELECT * FROM products';

  // db.query(q, (error, data) => {
  //   return res.json(data);
  // });
}
