-- PostgreSQL Database Script by Cesar Arcila

CREATE SEQUENCE seq_rol START WITH 4;

CREATE TABLE rol
( id_rol INT NOT NULL DEFAULT nextval('seq_rol')
, nombre VARCHAR(100) NOT NULL
, CONSTRAINT pk_rol PRIMARY KEY (id_rol)
);

INSERT INTO rol (id_rol, nombre) VALUES (1,'ADMINISTRADOR');
INSERT INTO rol (id_rol, nombre) VALUES (2,'AUDITOR');
INSERT INTO rol (id_rol, nombre) VALUES (3,'AUXILIAR');

CREATE SEQUENCE seq_usuario START WITH 1;

CREATE TABLE usuario
( id_usuario INT NOT NULL DEFAULT nextval('seq_usuario')
, id_rol INT NOT NULL
, nombre VARCHAR(100) NOT NULL
, activo CHAR NOT NULL
, CONSTRAINT pk_usuario PRIMARY KEY (id_usuario)
, CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
);

CREATE INDEX ix_usuario_rol ON usuario (id_rol);
