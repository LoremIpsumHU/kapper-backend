import express, { Router, Request, Response } from "express";
import db from "../utils/db";

const router: Router = express.Router();

router.get("/", (request: any, response: any) => {
   db.query("SELECT * FROM appointments").then((result: any) => {
      response.json({status: "success", data: result});
   }).catch((error: any) => {
      response.json({status: "error", message: 'Error in the database.'});
   });
});

router.get("/:id", (request: any, response: any) => {
   db.query("SELECT * FROM appointments WHERE id = $1", [request.params.id]).then((result: any) => {
      if(result.length > 0) {
         response.json({status: "success", data: result});
      } else {
         response.json({status: "error", message: 'Appointment not found.'});
      }
   }).catch((error: any) => {
      response.json({status: "error", message: 'Eror in the database.'});
   });
});

export default router;