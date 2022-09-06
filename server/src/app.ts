import express, { Application } from 'express';
import morgan from 'morgan';

//Create app
const app:Application = express();


//Read all json
app.use(express.json());

// ---> Middlewares <---
app.use(morgan('dev'));

//---> Routes <---


export default app;