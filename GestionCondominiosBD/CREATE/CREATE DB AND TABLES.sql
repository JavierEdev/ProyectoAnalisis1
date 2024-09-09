CREATE DATABASE PA2_Q01;

USE PA2_Q01;

CREATE TABLE condominios (
    id_condo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(2000),
    token_condo VARCHAR(255)
);

CREATE TABLE estados (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255)
);

CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255)
);

CREATE TABLE espacios (
    id_espacio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(3000),
    ubicacion VARCHAR(3000),
    mantenimiento INT,
    estado INT,
    condominio INT,
    CONSTRAINT fk_estado_espacio
        FOREIGN KEY (estado) REFERENCES estados(id_estado),
    CONSTRAINT fk_condominio_espacio
        FOREIGN KEY (condominio) REFERENCES condominios(id_condo)
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol INT,
    condominio INT,
    estado INT,
    CONSTRAINT fk_rol_usuario
        FOREIGN KEY (rol) REFERENCES roles(id_rol),
    CONSTRAINT fk_condominio_usuario
        FOREIGN KEY (condominio) REFERENCES condominios(id_condo),
    CONSTRAINT fk_estado_usuario
        FOREIGN KEY (estado) REFERENCES estados(id_estado)
);

CREATE TABLE sesiones (
    id_sesion INT AUTO_INCREMENT PRIMARY KEY,
    usr_id INT NOT NULL,
    token VARCHAR(64),
    expira_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usr_sesion
        FOREIGN KEY (usr_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE reservas (
    id_reservas INT AUTO_INCREMENT PRIMARY KEY,
    id_espacio INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    usuario_reserva INT NOT NULL,
    estado INT,
    CONSTRAINT fk_id_espacio_reserva
        FOREIGN KEY (id_espacio) REFERENCES espacios(id_espacio),
    CONSTRAINT fk_usuario_reserva
        FOREIGN KEY (usuario_reserva) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_estado_reserva
        FOREIGN KEY (estado) REFERENCES estados(id_estado)
);
