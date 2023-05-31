const mysql = require('mysql');
import { credentials } from '@/Credentials/dbCredentials';

const db = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '300mb',
    },
  },
};

export default function products(req, res) {
  const { ime } = req.body.sendData;
  const { prezime } = req.body.sendData;
  const { adresa } = req.body.sendData;
  const { ipAdress } = req.body.sendData;
  const { phone } = req.body.sendData;
  const { email } = req.body.sendData;
  const { napomena } = req.body.sendData;
  // const { total } = req.body.sendData;

  const productsJson = {
    properties: req.body.products,
  };
  const sendProductsJson = JSON.stringify(productsJson);

  const containsNumbers = (str) => {
    return /\d/.test(str);
  };

  const containsStrings = (num) => {
    return /^\d*\.?\d*$/.test(num);
  };

  const products = productsJson.properties.map(({ ...item }) => item);
  const p = JSON.stringify(products);

  let total = 0;
  req.body.products.forEach((e) => {
    total += Number(e.total);
  });

  if (
    ime !== '' &&
    prezime !== '' &&
    adresa !== '' &&
    ipAdress !== '' &&
    phone !== '' &&
    email !== ''
  ) {
    //ime, prezime, kod, telefon, email.
    if (!containsNumbers(ime) && !containsNumbers(prezime)) {
      if (containsStrings(phone) && containsStrings(ipAdress)) {
        const q = `INSERT INTO shopped (ime, postalCode, adress, phone, email, note, products, confirmed, payed) VALUES ('${
          ime + ' ' + prezime
        }', '${ipAdress}', '${adresa}', '${phone}', '${email}', '${napomena}', '${p}', 0, ${total})`;
        // }', '${ipAdress}', '${adresa}', '${phone}', '${email}', '${napomena}', '${sendProductsJson}', 0, ${total})`;
        db.query(q, (error, data) => {
          if (error) {
            console.log(error);
          } else {
            return res.send({
              type: 'success',
              mess: 'Uspesno ste porucili',
            });
          }
        });
      } else {
        res.send({
          type: 'error',
          mess: 'Telefon i postanski kod mogu imati samo brojeve bez razmaka',
        });
      }
    } else {
      res.send({ type: 'error', mess: 'Ime i prezime mogu imati samo slova' });
    }
  } else {
    res.send({ type: 'error', mess: 'Sva polja su obavezna sem napomene' });
  }
}
