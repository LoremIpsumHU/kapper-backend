import express from "express";
import appointments from "./modules/appointments";

const app = express();

require('dotenv').config();

app.use('/appointments', appointments);

app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
})