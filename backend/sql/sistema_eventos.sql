CREATE DATABASE IF NOT EXISTS sistema_eventos;
USE sistema_eventos;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255),
  role ENUM('organizador','participante') DEFAULT 'participante'
);

CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150),
  data DATE,
  local VARCHAR(150),
  descricao TEXT,
  id_organizador INT,
  FOREIGN KEY (id_organizador) REFERENCES usuarios(id) ON DELETE SET NULL
);