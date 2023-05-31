const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function id(req, res) {
  const { id } = req.query;

  //   const q = `SELECT defaultProducts.*, subproducts.id as subId, subproducts.modelName, subproducts.model, subproducts.price, subproducts.discountPrice, subproducts.defaultProducts_id, subproducts.information, productsproperties.properties, faces.faces FROM defaultProducts inner join subproducts on defaultProducts.id = subproducts.defaultProducts_id inner join productsproperties on subproducts.id = productsproperties.subProducts_id inner join faces on subproducts.id = faces.subProducts_id WHERE subproducts.id = ${id}`;
  const q = `SELECT products.*, properties.properties FROM products INNER JOIN properties ON properties.products_id = products.id WHERE products.id = ${id}`;
  db.query(q, (error, data) => {
    return res.json(data);
  });
}
