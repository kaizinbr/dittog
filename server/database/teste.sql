
-- SQLite
SELECT
    curriculo.nome AS nome_completo,
    curriculo.idade AS idade,
    curriculo.email,
    curriculo.tel AS telefone,
    curriculo.linkedin,
    curriculo.github,
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
    curriculo_experiencia
WHERE
    curriculo.id = 5
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
;

SELECT
    ativ_comp.nome AS nome_atividade,
    ativ_comp.duracao AS duracao_atividade,
    ativ_comp.tipo AS tipo_atividade,
    ativ_comp.atual AS faz_atualmente

FROM
    curriculo, ativ_comp
WHERE
    curriculo.id = ativ_comp.curriculo_id
    AND curriculo.id = 5
;
    

SELECT
    habilidades.nome AS nome_habilidade,
    habilidades.nivel AS nivel_da_habilidade
FROM
    habilidades, curriculo, curriculo_habilidades
WHERE
    curriculo.id = 5
    AND curriculo_habilidades.curriculo_id = curriculo.id
    AND curriculo_habilidades.habilidades_id = habilidades.id
;