import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'


import Database from '../database/database.js';

const salt = Number(process.env.SALT);

async function create(tempUsuario) {
    const db = await Database.connect();
    
    const {image, login, senha} = tempUsuario;

    console.log({image, login, senha})

		const hash = bcrypt.hashSync(senha, salt);

    if (await verifyEmail(login)) {
      const usuarioSQL = `
        INSERT INTO
          usuario (image, login, senha)
        VALUES
          (?, ?, ?)
        `;

      let {lastID} = await db.run(usuarioSQL, [image, login, hash]);
      
      return readById(lastID);
    } else return false;
}

async function verifyEmail(login) {
  const db = await Database.connect();

  const loginSQL = `
    SELECT
      login
    FROM
      usuario
    WHERE
      login = ?
  `

  const user = await db.get(loginSQL, [login]);

  if (user == undefined) return true;
  else false;
}

async function readAll() {
  const db = await Database.connect();

  const selectAllUsuarioSQL = `
    SELECT
      id, login
    FROM
      usuario
  `;

  return await db.all(selectAllUsuarioSQL);
}

async function readById(id) {
  const db = await Database.connect();

  const selectByIdUsuarioSQL = `
    SELECT
      *
    FROM
      usuario
    WHERE
     id = ?
  `;

  return (await db.get(selectByIdUsuarioSQL, [id]));
}

async function auth(login, senha) {
  try {
    const db = await Database.connect();
  
    const verifyAuthSQL = `
      SELECT
        *
      FROM
        usuario
      WHERE
        login = ?
    `
  
    const user = await db.get(verifyAuthSQL, [login]);
  
    const { id: id, senha: hash } = user;
  
    const match = await bcrypt.compareSync(senha, hash);
  
  
    if(user && match) {
      const token = jwt.sign(
        { id },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );
  
      console.log(token)
  
      return { auth: true, token } 
  }} catch(err) {
    throw new Error('User not found');
  }
}

async function getImage(id) {
  const db = await Database.connect();

  const getImageById = `
    SELECT
      image
    FROM
      usuario
    WHERE
     id = ?
  `;

  return (await db.get(getImageById, [id]));
}

export default {create, readAll, readById, auth, getImage};