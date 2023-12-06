-- TABLAS

create database prueba;
use prueba;

create table USUARIOS(
	ID int PRIMARY KEY AUTO_INCREMENT,
	NOMBRE VARCHAR(50) NOT NULL,
	APELLIDO VARCHAR(50) NOT NULL,
	USUARIO VARCHAR(50) UNIQUE NOT NULL,
	CONTRASENA VARCHAR(75) NOT NULL,
	EMAIL VARCHAR(50) UNIQUE NOT NULL);

create table PRODUCTOS(
	ID INT PRIMARY KEY,
	MARCA VARCHAR(20),
	DESCRIPCION VARCHAR(20),
	PRECIO DECIMAL (8,2),
    STOCK INT);

create table VENTAS(
	ID_VENTA int PRIMARY KEY AUTO_INCREMENT,
    CANTIDAD INT,
	ARTICULOS VARCHAR(10),
	PRECIO_VENTA DECIMAL (8,2),
	VENDIDO_POR VARCHAR(50),
	FECHA DATE,
	FOREIGN KEY (VENDIDO_POR)
	REFERENCES USUARIOS(NOMBRE));
	
create table HISTORIAL_ACCESO(
	ID_USUARIO int PRIMARY KEY,
    TIEMPO_CONECTADO INT,
	FECHA DATE,
	FOREIGN KEY (ID_USUARIO)
	REFERENCES USUARIOS(ID));
	

create table ESTADISTICAS(
	DINERO_TOTAL DECIMAL (8,2),
	TOTAL_VENTAS int);

	

	
--PROCEDIMIENTOS

--PROCEDIMIENTO VERIFICAR CUENTA
DELIMITER $$
CREATE PROCEDURE verificarSesionCuenta(IN usuario VARCHAR(50), IN contra VARCHAR(75))
BEGIN
	SELECT TABLA_ADMIN.ID_USUARIO, TABLA_ADMIN.USUARIO, TABLA_ADMIN.CONTRASENA INTO @id, @usuario, @contra FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario;
	IF (SELECT COUNT(TABLA_ADMIN.ID_USUARIO) FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario) != 1 THEN
		SET @message_text = CONCAT('Este usuario no existe');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	ELSE
		SELECT @id AS id, @usuario AS usuario;
	END IF;
END

DELIMITER $$
CREATE PROCEDURE verificarSesionCuenta2(IN usuario VARCHAR(50))
BEGIN
	SELECT TABLA_ADMIN.ID_USUARIO, TABLA_ADMIN.USUARIO INTO @id, @usuario FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario;
	IF (SELECT COUNT(TABLA_ADMIN.ID_USUARIO) FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario) != 1 THEN
		SET @message_text = CONCAT('Este usuario no existe');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	ELSE
		SELECT @id AS id, @usuario AS usuario;
	END IF;
END

--PROCEDIMIENTO VERIFICAR CONTRASEÑA
DELIMITER $$
CREATE PROCEDURE verificarSesionContra(IN usuario VARCHAR(50), IN contra VARCHAR(75))
BEGIN
	SELECT TABLA_ADMIN.ID_USUARIO, TABLA_ADMIN.USUARIO, TABLA_ADMIN.CONTRASENA INTO @id, @usuario, @contra FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario;
	IF (SELECT COUNT(TABLA_ADMIN.ID_USUARIO) FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO = usuario AND TABLA_ADMIN.CONTRASENA = contra) != 1 THEN
		SET @message_text = CONCAT('La contraseña incorrecta');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	ELSE
		SELECT @id AS id, @usuario AS usuario;
	END IF;
END

--PROCEDIMIENTO CREAR CUENTA
DELIMITER $$
CREATE PROCEDURE crearUsuario(IN nombre VARCHAR(50), IN ap VARCHAR(50), IN usuario VARCHAR(50), IN contra VARCHAR(75), IN cs int, IN desac BOOLEAN, IN ci int)
BEGIN
	IF (SELECT COUNT(TABLA_ADMIN.ID_ADMIN) FROM TABLA_ADMIN WHERE TABLA_ADMIN.USUARIO  = usuario) > 0 THEN
		SET @message_text = CONCAT('Este usuario ya existe');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	ELSE
		INSERT INTO TABLA_ADMIN(NOMBRE, AP, USUARIO, CONTRASENA, CODIGO_SEGURIDAD, DESACTIVADO, CONTRA_INTENTOS) VALUES (nombre,ap,usuario,contra,cs,desac,ci);
	END IF;
END

DELIMITER ;

--TRIGGERS

DELIMITER $$

    CREATE TRIGGER desactivarCuenta BEFORE UPDATE ON `TABLA_ADMIN`
    FOR EACH ROW BEGIN
      IF (NEW.CONTRA_INTENTOS = 3) THEN
            SET NEW.DESACTIVADO = 1;
      END IF;
    END$$

DELIMITER ;

