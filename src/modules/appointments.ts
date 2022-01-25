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

export default router; 