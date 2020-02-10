const express = require('express');
const app = express();
const port = process.env.PORT || 8003;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const routs = require('./routes.js');
const initDb = () => {
    let value = db.has('products').value();
    if (!value) {
        db.defaults({ products: [], cart: [] }).write();
    }
}
routs(app, db);
app.use(express.static('public'))
app.listen(port, () => {
    initDb();
    console.log('Lyssnar vid port: ', port
    )
});