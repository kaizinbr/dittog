 import Database from '../database/database.js';

// Renderiza o currículo no html

async function getCurriculo(id) {
  const db = await Database.connect();

  const CurriculoSQL = `
  SELECT
  curriculo.nome AS nome_completo,
  curriculo.idade AS idade,
  curriculo.email,
  curriculo.tel AS telefone,
  curriculo.linkedin,
  curriculo.github,
	curriculo.usuario_id AS usuario_id,
  endereco.pais,
  endereco.estado,
  endereco.cidade,
  area_atuacao.nome AS area_de_atuacao,
  especializacao.nome AS especializacao,
  instituicao.nome AS nome_da_instituicao,
  formacao.nome AS nome_da_formacao,
  formacao.nivel AS nivel_da_formacao,
  formacao.periodo AS periodo_da_formacao,
  formacao.duracao AS duracao_da_formacao,
  cur_extras.nome AS nome_do_curso,
  cur_extras.duracao AS duracao_do_curso,
  cur_extras.tipo AS tipo_do_curso,
  empresa.nome AS nome_da_empresa,
  experiencia_profissional.cargo AS cargo_da_experiencia,
  experiencia_profissional.periodo AS periodo_da_experiencia,
  experiencia_profissional.descricao AS descricao_da_experiencia



FROM
  curriculo, endereco, area_atuacao, especializacao, instituicao, formacao,
  cur_extras, empresa, experiencia_profissional, experiencia_empresa,
  curriculo_experiencia, usuario
WHERE
  curriculo.id = ?
  AND curriculo.endereco_id = endereco.id
  AND especializacao.area_atuacao_id = area_atuacao.id
  AND area_atuacao.id = curriculo.area_atuacao_id
  AND formacao.curriculo_id = curriculo.id
  AND formacao.instituicao_id = instituicao.id
  AND cur_extras.curriculo_id = curriculo.id
  AND cur_extras.instituicao_id = instituicao.id
  AND empresa.id = experiencia_empresa.empresa_id
  AND experiencia_profissional.id = experiencia_empresa.experiencia_profissional_id
  AND curriculo.id = curriculo_experiencia.curriculo_id
  AND experiencia_profissional.id = curriculo_experiencia.experiencia_profissional_id
	AND usuario.id = curriculo.usuario_id
;
  `;

  const curriculo = await db.get(CurriculoSQL, [id]);

  const AtividadesSQL = `
  SELECT
    ativ_comp.nome AS nome_atividade,
    ativ_comp.duracao AS duracao_atividade,
    ativ_comp.tipo AS tipo_atividade,
    ativ_comp.atual AS faz_atualmente

FROM
    curriculo, ativ_comp
WHERE
    curriculo.id = ativ_comp.curriculo_id
    AND curriculo.id = ?
;
  `;


  const atividades = await db.all(AtividadesSQL, [id]);


  const HabilidadesSQL = `
  SELECT
    habilidades.nome AS nome_habilidade,
    habilidades.nivel AS nivel_da_habilidade
FROM
    habilidades, curriculo, curriculo_habilidades
WHERE
    curriculo.id = ?
    AND curriculo_habilidades.curriculo_id = curriculo.id
    AND curriculo_habilidades.habilidades_id = habilidades.id
;
  `;

  const habilidades = await db.all(HabilidadesSQL, [id]);

  const response = {curriculo, atividades, habilidades}
  return response;
}

async function readAll() {
    const db = await Database.connect();
    const sql = `
      SELECT
        *
      FROM
        curriculo
    `;
  
    const curriculo = await db.all(sql);
  
    return curriculo;
}

async function setCurriculo(tempCurriculo, usuario_id) {
    const db = await Database.connect();
    
    const {nome, idade, tel, email, linkedin,
      github, pais, estado, cidade, nomeArea, nomeEspecializacao, nomeInstituicao,
      nomeEmpresa, cargoExp, periodoExp, descricaoExp, atividades_complementares, nivelFormacao,
      nomeFormacao, periodoFormacao, 
      duracaoFormacao, nomeCur, duracaoCur, tipoCur, habilidades}
      = tempCurriculo;

    // Usuário

    // Endereço
    const enderecoSQL = `
      INSERT INTO
        endereco (pais, estado, cidade)
      VALUES
        (?, ?, ?)
    `;

    let {lastID} = await db.run(enderecoSQL, [pais, estado, cidade]);

    const lastIDEndereco = lastID;

    // Área Atuação
    const area_atuacaoSQL = `
      INSERT INTO
        area_atuacao (nome)
      VALUES
        (?)
    `;

    lastID = await db.run(area_atuacaoSQL, [nomeArea]);
    const lastIDAreaAtuacao = lastID.lastID;

    // Especializacao TO-DO
    const especializacaoSQL = `
      INSERT INTO
        especializacao (nome, area_atuacao_id)
      VALUES
        (?, ?)
    `;

    lastID = await db.run(especializacaoSQL, [nomeEspecializacao, lastIDAreaAtuacao]);

    const lastIDespecializacao = lastID.lastID;

    // Currículo
    const curriculoSQL = `
      INSERT INTO
        curriculo (nome, idade, tel, email, linkedin, github,
          usuario_id, endereco_id, area_atuacao_id)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
     lastID = await db.run(curriculoSQL, [nome, idade,
      tel, email, linkedin, github, usuario_id, lastIDEndereco,
      lastIDAreaAtuacao]);

      const lastIDCurriculo = lastID.lastID;

      // Instituicao TO-DO
      const InstituicaoSQL = `
      INSERT INTO
        instituicao(nome)
      VALUES
        (?)
    `;

     lastID = await db.run(InstituicaoSQL, [nomeInstituicao]);

      const lastIDInstituicao = lastID.lastID;

    //Formacao
    
    const FormacaoSQL = `
    INSERT INTO
      formacao(nivel, nome, periodo, duracao, curriculo_id, instituicao_id)
    VALUES
      (?, ?, ?, ?, ?, ?)
  `;

   lastID = await db.run(FormacaoSQL, [nivelFormacao, nomeFormacao, periodoFormacao,
    duracaoFormacao, lastIDCurriculo, lastIDInstituicao]);

    const lastIDFormacao = lastID.lastID;

      /*
      Tabelas a serem inseridas em setCurriculo()

      - Especializacao JÀ
 
      - Formacao (Júlia) 
      - Cur_extras (Júlia) JA
      - Empresa (Kaio) JÁ
      - ExpProf (Kaio) JÁ
      - Experiencia_Empresa (Kaio) JÁ
      - Currículo_Experiencia (Carlos André) JÁ
      - AtivComp (Carlos André) JÁ
      - Habilidades (Carlos André) JÁ
      - Curriculo_Habilidades (Carlos André) JÁ
      */



      // Cur_extras TO-DO
      const Cur_ExtrasSQL = `
      INSERT INTO
        cur_extras (nome, duracao, tipo, curriculo_id, instituicao_id)
      VALUES
        (?, ?, ?, ?, ?)
    `;
  
     lastID = await db.run(Cur_ExtrasSQL, [nomeCur, duracaoCur, tipoCur, lastIDCurriculo, lastIDInstituicao]);
  
      const lastIDCur_Extras = lastID.lastID;

      // Empresa TO-DO
      const empresaSQL = `
      INSERT INTO
        empresa (nome)
      VALUES
        (?)
    `;

    lastID = await db.run(empresaSQL, [nomeEmpresa]);

    const lastIDempresa = lastID.lastID;


      // ExpProf TO-DO
      const experienciaProfissionalSQL = `
      INSERT INTO
        experiencia_profissional (cargo, periodo, descricao)
      VALUES
        (?,?,?)
    `;

    lastID = await db.run(experienciaProfissionalSQL, [cargoExp, periodoExp, descricaoExp]);
      

    const lastIDExperienciaProfisional = lastID.lastID;


      // Experiencia_Empresa TO-DO
      const experienciaEmpresaSQL = `
      INSERT INTO
        experiencia_empresa (experiencia_profissional_id, empresa_id)
      VALUES
        (?,?)
    `;

    await db.run(experienciaEmpresaSQL, [lastIDExperienciaProfisional, lastIDempresa]);
      
      // Curriculo_Experiencia TO-DO
      const curriculoExperienciaSQL = `
      INSERT INTO
      curriculo_experiencia (curriculo_id, experiencia_profissional_id)
      VALUES
        (?, ?)
    `;

  
     lastID = await db.run(curriculoExperienciaSQL, [lastIDCurriculo, lastIDExperienciaProfisional]);

      const lastIDCurriculoExperiencia = lastID.lastID;

      // AtivComp TO-DO
      const lastIDAtvComp = [];
      for (const atividades_complementar of atividades_complementares) {
        const atvCompSQL = `
        INSERT INTO
        ativ_comp (nome, duracao, tipo, atual, curriculo_id)
        VALUES
          (?, ?, ?, ?, ?)
      `;
  
    
        lastID = await db.run(atvCompSQL, [atividades_complementar.nome, atividades_complementar.duracao, atividades_complementar.tipo, atividades_complementar.atual, lastIDCurriculo]);
  
        lastIDAtvComp.push(lastID.lastID);
      }
      
      
      // Habilidades TO-DO
      const lastIDHabilidades = [];
      for (const habilidade of habilidades) {
        const habilidadesSQL = `
        INSERT INTO
        habilidades (nome, nivel)
        VALUES
          (?, ?)
      `;
  
    
        lastID = await db.run(habilidadesSQL, [habilidade.nome, habilidade.nivel]);
  
        lastIDHabilidades.push(lastID.lastID);

        // Curriculo_Habilidades TO-DO
        const lastIDCurriculo_Habilidades = [];
        const Curriculo_HabilidadesSQL = `
        INSERT INTO
        curriculo_habilidades (curriculo_id, habilidades_id)
        VALUES
          (?, ?)
      `;
  
    
        lastID = await db.run(Curriculo_HabilidadesSQL, [lastIDCurriculo, lastID.lastID]);
  
        lastIDCurriculo_Habilidades.push(lastID.lastID);
      }

      const retorno = {lastIDCurriculo, usuario_id};
      
      return retorno;
}

export default {getCurriculo, setCurriculo, readAll};
