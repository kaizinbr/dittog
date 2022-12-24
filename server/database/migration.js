import Database from './database.js'

async function up() {
  const db = await Database.connect();

    const createArea_atuacao = `
      CREATE TABLE area_atuacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(50) NOT NULL
      )`;

    const createEspecializacao = `
      CREATE TABLE especializacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(50) NOT NULL,
        area_atuacao_id INTEGER NOT NULL,
        FOREIGN KEY (area_atuacao_id) REFERENCES area_atuacao (id)
      )`;

    const createEndereco = `
      CREATE TABLE endereco (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          pais VARCHAR(50) NOT NULL,
          estado VARCHAR(50) NOT NULL,
          cidade VARCHAR(50) NOT NULL
      )`;

    const createUsuario = `
      CREATE TABLE usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          image VARCHAR(50) NOT NULL,
          login VARCHAR(25) NOT NULL,
          senha VARCHAR(25) NOT NULL
      )`;

    const createCurriculo = `
        CREATE TABLE curriculo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(50) NOT NULL,
            idade INT,
            tel VARCHAR(15) NOT NULL,
            email VARCHAR(50) NOT NULL,
            linkedin VARCHAR(15),
            github VARCHAR(15),
            usuario_id INTEGER NOT NULL,
            endereco_id INTEGER NOT NULL,
            area_atuacao_id INTEGER NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuario (id),
            FOREIGN KEY (endereco_id) REFERENCES endereco (id),
            FOREIGN KEY (area_atuacao_id) REFERENCES area_atuacao (id)
    )`;

      const createInstituicao = `
        CREATE TABLE instituicao (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(50) NOT NULL
        )`;

      const createFormacao = `
        CREATE TABLE formacao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nivel VARCHAR(50) NOT NULL,
            nome VARCHAR(50) NOT NULL,
            periodo VARCHAR(50) NOT NULL,
            duracao VARCHAR(50) NOT NULL,
            curriculo_id INTEGER NOT NULL,
            instituicao_id INTEGER NOT NULL,
            FOREIGN KEY (curriculo_id) REFERENCES curriculo (id),
            FOREIGN KEY (instituicao_id) REFERENCES instituicao (id)
        )`;

        const createCur_extras = `
        CREATE TABLE cur_extras (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(50) NOT NULL,
          duracao VARCHAR(50) NOT NULL,
          tipo VARCHAR(25) NOT NULL,
          curriculo_id INTEGER NOT NULL,
          instituicao_id INTEGER NOT NULL,
          FOREIGN KEY (curriculo_id) REFERENCES curriculo (id),
          FOREIGN KEY (instituicao_id) REFERENCES instituicao (id)
        )`;

        const createEmpresa =`
          CREATE TABLE empresa (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome VARCHAR(50) NOT NULL
          ) `;

        const createExpProf = `
          CREATE TABLE experiencia_profissional (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              cargo VARCHAR(50) NOT NULL,
              periodo VARCHAR(50) NOT NULL,
              descricao VARCHAR(250) NOT NULL
          )`;

        const createExperiencia_Empresa = `
          CREATE TABLE experiencia_empresa (
            experiencia_profissional_id INTEGER NOT NULL,
            empresa_id INTEGER NOT NULL,
            FOREIGN KEY (experiencia_profissional_id) REFERENCES experiencia_profissional (id),
            FOREIGN KEY (empresa_id) REFERENCES empresa (id),
            PRIMARY KEY (experiencia_profissional_id, empresa_id)
          )`;

        const createCurriculo_Experiencia = `
          CREATE TABLE curriculo_experiencia (
            curriculo_id INTEGER NOT NULL,
            experiencia_profissional_id INTEGER NOT NULL,
            FOREIGN KEY (curriculo_id) REFERENCES curriculo (id),
            FOREIGN KEY (experiencia_profissional_id) REFERENCES experiencia_profissional (id),
            PRIMARY KEY (experiencia_profissional_id, curriculo_id)
          )`;


        const createAtivComp = `
          CREATE TABLE ativ_comp (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome VARCHAR(50) NOT NULL,
              duracao VARCHAR(50) NOT NULL,
              tipo VARCHAR(25) NOT NULL,
              atual INTEGER NOT NULL,
              curriculo_id INTEGER NOT NULL,
              FOREIGN KEY (curriculo_id) REFERENCES curriculo (id)
          )`;
          
        const createHabilidades = `
          CREATE TABLE habilidades (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome VARCHAR(50) NOT NULL,
              nivel VARCHAR(20) NOT NULL
          )`;

          const createCurriculo_Habilidades = `
          CREATE TABLE curriculo_habilidades (
            curriculo_id INTEGER NOT NULL,
            habilidades_id INTEGER NOT NULL,
            FOREIGN KEY (curriculo_id) REFERENCES curriculo (id),
            FOREIGN KEY (habilidades_id) REFERENCES habilidades (id),
            PRIMARY KEY (habilidades_id, curriculo_id)
          )`;

  
  await db.run(createArea_atuacao);
  await db.run(createEspecializacao);
  await db.run(createEndereco);
  await db.run(createUsuario);
  await db.run(createCurriculo);
  await db.run(createInstituicao);
  await db.run(createFormacao);
  await db.run(createCur_extras);
  await db.run(createEmpresa);
  await db.run(createExpProf);
  await db.run(createExperiencia_Empresa);
  await db.run(createCurriculo_Experiencia);
  await db.run(createAtivComp);
  await db.run(createHabilidades);
  await db.run(createCurriculo_Habilidades);

}

export default { up };