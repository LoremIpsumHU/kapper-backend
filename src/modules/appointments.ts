import express, { Router, Request, Response } from "express";
import db from "../utils/db";

const router: Router = express.Router();

router.get("/", (request: any, response: any) => {
   db.query("SELECT a.id, a.name, a.email, a.phone, a.start_time, a.comment, t.id as treatment_id, t.name as treatment_name, t.description as treatment_description, t.duration as treatment_duration, t.price as treatment_price, ba.barber_id, b.name as barber_name, b.email as barber_email from appointments AS a JOIN appointment_treatments AS at ON a.id = at.appointment_id JOIN treatments AS t ON at.treatment_id = t.id JOIN barber_appointments AS ba ON t.id = ba.appointment_id JOIN barbers AS b ON ba.barber_id = b.id;").then((result: any) => {
      response.json({status: "success", data: result});
   }).catch((error: any) => {
      response.json({status: "error", message: 'Error in the database.'});
   });
});

router.get("/:id", (request: any, response: any) => {
   db.query("SELECT a.id, a.name, a.email, a.phone, a.start_time, a.comment, t.id as treatment_id, t.description as treatment_description, t.description as treatment_description, t.duration as treatment_duration, t.price as treatment_price, ba.barber_id, b.name as barber_name, b.email as barber_email from appointments AS a JOIN appointment_treatments AS at ON a.id = at.appointment_id JOIN treatments AS t ON at.treatment_id = t.id JOIN barber_appointments AS ba ON t.id = ba.appointment_id JOIN barbers AS b ON ba.barber_id = b.id WHERE id = $1", [request.params.id]).then((result: any) => {
      if(result.length > 0) {
         response.json({status: "success", data: result});
      } else {
         response.json({status: "error", message: 'Appointment not found.'});
      }
   }).catch((error: any) => {
      response.json({status: "error", message: 'Eror0 in the database.'});
   });
}); 

router.post("/", (request: any, response: any) => {
   var tr: any = {'Knippen': 1, 'Wassen': 2, 'Kleuren': 3}
   var barb: any = {'Kevin': 1, 'Alisha': 2, 'Tobias': 3, 'Pieter': 4}
   db.query(`INSERT INTO appointments (name, email, phone, start_time, comment) VALUES ($1, $2, $3, $4, $5) RETURNING id as appointment_id;
   `, [request.body.name, request.body.email, request.body.phone, request.body.start_time, request.body.comment]).then((result: any) => {
      var app_id = result[0].appointment_id;

      for (var treatment in request.body.treatments) {
         var treatment_name = request.body.treatments[treatment];
         var treatment_id = tr[treatment_name];

         db.query(`INSERT INTO appointment_treatments (appointment_id, treatment_id) VALUES ($1, $2);
         `, [app_id, treatment_id]).then((result: any) => {
         }).catch((error: any) => {
            return response.json({status: "error", message: 'Error in the database.', error});
         });
      }

      var barber_name = request.body.barber_name;
      var barber_id = barb[barber_name];
      db.query(`INSERT INTO barber_appointments (appointment_id, barber_id) VALUES ($1, $2);
      `, [app_id, barber_id]).then((result: any) => {
         
      }).catch((error: any) => {
         return response.json({status: "error", message: 'Error in the database.', error});
      });

      response.json({status: "success", data: result});
   }).catch((error: any) => {
      return response.json({status: "error", message: 'Error in the database.', error});
   });
});

export default router; 