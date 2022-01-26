import express from "express";
import appointments from "./modules/appointments";
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(cors({origin: "*"}));

app.use(bodyParser.json());

app.use('/appointments', appointments);

app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
})