const express = require('express');
const lowdb = require('lowdb');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);
const port = process.env.PORT || 8003;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const initiateDatabase = () => {
  const databaseInitiated = database.has('products').value();

  if (!databaseInitiated) {
    database.defaults({
      products: [{
          id: 1,
          name: 'skateboard',
          price: 1000,
          image: 'https://placeimg.com/640/480/any'
        },
        {
          id: 2,
          name: 'wheels',
          price: 200,
          image: 'https://placeimg.com/640/480/any'
        },
        {
          id: 3,
          name: 'helmet',
          price: 400,
          image: 'https://placeimg.com/640/480/any'
        },
        {
          id: 4,
          name: 'kneepads',
          price: 300,
          image: 'https://placeimg.com/640/480/any'
        }
      ],
      cart: []
    }).write();
  }
}

app.get('/', (request, response) => {

  const products = database.get('products')
  response.send(products);

});

app.post('/api/cart', (request, response) => {

  let id = request.body.id;
  let product = parseInt(id);

  let findProducts = database.get('products')
    .find({
      'id': product
    })
    .value();

  if (!findProducts) {

    response.status(404).send("Produkten du valt finns inte!");

  } else {

    let searchProducts = database.get('cart')
      .find({
        'id': product
      })
      .value();

    if (searchProducts) {

      response.status(404).send("Produkten finns redan i din varukorg");

    } else {

      const addProduct = database.get('cart')
        .push(findProducts)
        .write();

      response.send(addProduct);

    };
  };
});

app.delete('/api/cart/:id', (request, response) => {

  let id = request.params.id;
  let product = parseInt(id);

  let findProducts = database.get('cart')
    .find({
      'id': product
    })
    .value();

  if (!findProducts) {

    response.status(404).send("Produkten du valt finns inte");

  } else {

    let removeProduct = database.get('cart')
      .remove(findProducts)
      .write();

    response.send(removeProduct);

  };
});

app.get('/api/cart', (request, response) => {
  const cart = database.get('cart').write();
  response.send(cart);
});

app.listen(port, () => {
  console.log('Server started on port: ', port);
  initiateDatabase();
});

