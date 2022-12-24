import 'express-async-errors';
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';

import curriculo from './models/curriculum.js';
import user from './models/usuario.js';

import path from 'path';
import {fileURLToPath} from 'url';
import { jsPDF } from "jspdf";

import router from './routes.js'; 

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/', express.static('public'));
app.use('/', router);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
});

