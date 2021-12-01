import express from "express";
import products from "./modules/products";
const { Client } = require('pg');
const fs = require('fs');

const client = new Client();
const app = express();

app.get("/", (request, response) => {
    response.send("This is a test web page!");
})

app.use('/', products);

app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
})