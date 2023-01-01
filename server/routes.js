import { Router } from "express";
import 'dotenv/config'
import { celebrate, Joi, errors, Segments } from 'celebrate';

import path from 'path';
import {fileURLToPath} from 'url';
import  Banner from './database/get-banner-data.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = Router();
const c = console;


router.get('/developers', async (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/developer.html'));
  const id = parseInt((req.params.id));

//  res.json(response);
});

router.get('/games', async (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/games.html'));
});

router.get('/banner-data', async (req, res) => {
  const response = await Banner.getBannerData();
 res.json(response);
});

router.get('/pesquisa', async (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/search.html'));
});

// ESPECIAL PRA CRIAR AS PAGES DE GAMES
router.get('/game-data', async (req, res) => {
  const response = await Banner.getGameData();
  res.json(response);
});

  router.use(errors());

export default router;

