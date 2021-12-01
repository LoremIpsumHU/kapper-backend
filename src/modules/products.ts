import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/api/products", (request: any, response: any) => {
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

export default router;