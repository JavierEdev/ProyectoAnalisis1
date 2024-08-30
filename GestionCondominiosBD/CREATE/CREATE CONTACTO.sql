USE PA2_Q01;

CREATE TABLE contactos (
	idContacto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    correo VARCHAR(300),
    sujeto VARCHAR(500),
    mensaje VARCHAR(6000)
);