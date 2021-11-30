import express from "express";
const { Client } = require('pg')

const client = new Client();
const app = express();

app.get("/", (request, response) => {
    response.send("This is a test web page!");
})

app.get("/api/products", (request, response) => {
    let testData = [{
        "name": "test product",
        "description": "",
        "price": 500, // price in euros multiplied by 100, actual price is €5.00
        "image": "",
        "category": "test_category"
    }];

    //client.connect();
    // client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    //     console.log(err ? err.stack : res.rows[0].message) // Hello World!
    //     client.end()
    // })

    response.json(testData);
})

app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
})