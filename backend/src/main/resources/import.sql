INSERT INTO tb_tipo_item (descricao) VALUES ('Teste');

INSERT INTO tb_pessoa (nome, email, curriculo) VALUES ('Maria', 'maria@gmail.com', null);

INSERT INTO tb_papel (descricao) VALUES ('Visitante');
INSERT INTO tb_papel (descricao) VALUES ('Palestrante');
INSERT INTO tb_papel (descricao) VALUES ('Responsavel');

INSERT INTO tb_pessoa_papel (pessoa_id, papel_id) VALUES (1, 1);

INSERT INTO tb_visita (local, data_inicio, data_fim, responsavel_id) VALUES ('Local 1', TIMESTAMP WITHOUT TIME ZONE '2024-01-01T00:00:00Z', TIMESTAMP WITHOUT TIME ZONE '2024-01-01T02:00:00Z', 1);
