module.exports = (app, db) => {

    const getObj = obj => {
      let objToFind = {
        id: obj.id
      }
      let objToAdd = db.get('products').find(objToFind).value();
      return objToAdd;
    }
  
    const getObjFromCart = obj => {
      let objToFind = {
        id: obj.id
      }
      let objToAdd = db.get('cart').find(objToFind).value();
      return objToAdd;
    }
  
    const addToCart = (obj, res) => {
      let value = db.get('cart').find({
        product: obj.product,
        id: obj.id
      }).value();
      let errorMssg = {
        status: 'Error',
        message: 'Produkten finns redan i varukorgen'
      }
      let successMssg = {
        status: 'Success',
        message: 'Produkten tillagd!'
      }
      if (value != undefined) {
        res.end(JSON.stringify(errorMssg));
        console.log(errorMssg)
      } else {
        db.get('cart').push(obj).write();
        res.send(successMssg);
        console.log(successMssg)
      }
    }
  
    const deleteFromCart = (obj, res) => {
      let errorMssg = {
        status: 'Error',
        message: 'Produkten finns inte i varukorgen'
      }
      let successMssg = {
        status: 'Success',
        message: 'Produkten borttagen från varukorgen'
      }
  
      if (obj != undefined) {
        db.get('cart').remove(obj).write();
        res.send(successMssg);
        console.log(successMssg)
      } else {
        res.end(JSON.stringify(errorMssg));
        console.log(errorMssg)
      }
    }
  
    const getAllFromCart = res => {
      let data = db.get('cart').value();
      res.send(data);
    }
  
    const getAllProducts = res => {
      let data = db.get('products').value();
      res.send(data);
    }
  
    app.post('/cart/add', (req, res) => {
      let objToSend = req.query;
      addToCart(getObj(objToSend), res);
    });
  
    app.delete('/cart/delete', (req, res) => {
      let objToDelete = req.query;
      deleteFromCart(getObjFromCart(objToDelete), res);
    });
  
    app.get('/cart/getAll', (req, res) => {
      getAllFromCart(res);
    });
  
    app.get('/products/getAll', (req, res) => {
      getAllProducts(res)
    });
  }  