const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function editor(req, res) {
  const { id } = req.query;

  res.send([
    {
      id: 2,
      modelName: 'Metalna solja',
      model: 'metalCup.glb',
      promoId: 'Nepal subli',
      information:
        'Solja je napravljena od nerdjajuceg celika. Najmanja kolicina je 1 komad',
      categories_id: 2,
      price: '900',
      printPrice: '160',
      mostPopular: 'true',
      productsImage: '{"properties": ["nepalsubli1.png", "nepalsubli2.png"]}',
      faces: '{"properties": [{"faceName": "insert"}]}',
    },
  ]);

  // //   const q = `SELECT defaultProducts.*, subproducts.id as subId, subproducts.modelName, subproducts.model, subproducts.price, subproducts.discountPrice, subproducts.defaultProducts_id, subproducts.information, productsproperties.properties, faces.faces FROM defaultProducts inner join subproducts on defaultProducts.id = subproducts.defaultProducts_id inner join productsproperties on subproducts.id = productsproperties.subProducts_id inner join faces on subproducts.id = faces.subProducts_id WHERE subproducts.id = ${id}`;
  // const q = `SELECT products.*, faces.faces FROM products INNER JOIN faces ON faces.products_id = products.id WHERE products.id = ${id}`;

  // db.query(q, (error, data) => {
  //   return res.json(data);
  // });
}
