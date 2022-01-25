import express from "express";
import appointments from "./modules/appointments";
var cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors({origin: "*"}));

app.use('/appointments', appointments);

app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
})