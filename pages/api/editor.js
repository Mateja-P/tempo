const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export default function editor(req, res) {
  const { pid } = req.query;

  const arr = [
    {
      id: 1,
      modelName: 'Majca kratkih rukava',
      model: 'shirtmodel.glb',
      promoId: 'Premium',
      information: 'Majca je 100% od pamuka. Najmanja kolicina je 1 komad',
      categories_id: 1,
      price: '1450',
      printPrice: '160',
      mostPopular: 'true',
      productsImage:
        '{"properties": ["premium1801.png", "premium1802.png", "premium1803.png"]}',
      properties:
        '{"properties": [{"sizes": ["S", "M", "L", "XL", "XXL", "3XL"], "gender": {"name": "Muska", "promoId": 50.063}, "meshes": [{"code": {"x": 1, "y": 0, "z": 0}, "color": "crvena", "promoId": 30}, {"code": {"x": 0, "y": 0, "z": 2}, "color": "svetlo plava", "promoId": 23}, {"code": {"x": 0, "y": 0, "z": 0.8}, "color": "tamno plava", "promoId": 23}, {"code": {"x": 1.5, "y": 1.5, "z": 1.5}, "color": "bela", "promoId": 90}, {"code": {"x": 0, "y": 0, "z": 0}, "color": "crna", "promoId": 10}]}, {"sizes": ["S", "M", "L", "XL"], "gender": {"name": "Zenska", "promoId": 50.064}, "meshes": [{"code": {"x": 1, "y": 0, "z": 0}, "color": "crvena", "promoId": 30}, {"code": {"x": 0, "y": 0, "z": 2}, "color": "svetlo plava", "promoId": 23}, {"code": {"x": 0, "y": 0, "z": 0.8}, "color": "tamno plava", "promoId": 23}, {"code": {"x": 1.5, "y": 1.5, "z": 1.5}, "color": "bela", "promoId": 90}, {"code": {"x": 0, "y": 0, "z": 0}, "color": "crna", "promoId": 10}]}]}',
    },
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
  ];

  const sendData = arr.filter((e) => {
    return e.id == pid;
  });

  res.send(sendData);

  // res.send([
  //   {
  //     id: 2,
  //     modelName: 'Metalna solja',
  //     model: 'metalCup.glb',
  //     promoId: 'Nepal subli',
  //     information:
  //       'Solja je napravljena od nerdjajuceg celika. Najmanja kolicina je 1 komad',
  //     categories_id: 2,
  //     price: '900',
  //     printPrice: '160',
  //     mostPopular: 'true',
  //     productsImage: '{"properties": ["nepalsubli1.png", "nepalsubli2.png"]}',
  //     faces: '{"properties": [{"faceName": "insert"}]}',
  //   },
  // ]);

  // //   const q = `SELECT defaultProducts.*, subproducts.id as subId, subproducts.modelName, subproducts.model, subproducts.price, subproducts.discountPrice, subproducts.defaultProducts_id, subproducts.information, productsproperties.properties, faces.faces FROM defaultProducts inner join subproducts on defaultProducts.id = subproducts.defaultProducts_id inner join productsproperties on subproducts.id = productsproperties.subProducts_id inner join faces on subproducts.id = faces.subProducts_id WHERE subproducts.id = ${id}`;
  // const q = `SELECT products.*, faces.faces FROM products INNER JOIN faces ON faces.products_id = products.id WHERE products.id = ${id}`;

  // db.query(q, (error, data) => {
  //   return res.json(data);
  // });
}
