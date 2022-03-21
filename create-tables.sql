-- Desactivo las restricciones de claves foraneas 
-- para poder dropear las tablas sin problemas
PRAGMA foreign_keys = OFF;
-- Si la tabla ya existe la borro
DROP TABLE IF EXISTS MUNICIPALIDAD;
-- creo la tabla
CREATE TABLE MUNICIPALIDAD (
   municipalidad_id INTEGER PRIMARY KEY,
   nombre TEXT NOT NULL UNIQUE
);
-- Si la tabla ya existe la borro
DROP TABLE IF EXISTS PUESTO;
-- creo la tabla
CREATE TABLE PUESTO (
   puesto_id INTEGER PRIMARY KEY,
   nombre TEXT NOT NULL UNIQUE
);
-- Si la tabla ya existe la borro
DROP TABLE IF EXISTS EMPLEADO;
-- creo la tabla
CREATE TABLE EMPLEADO (
	empleado_id integer PRIMARY KEY,
   nombre text NOT NULL,
   apellido text NOT NULL,
   telefono text NOT NULL,
   email text NOT NULL UNIQUE,
   salario float NOT NULL,
   antiguedad integer NOT NULL,
   municipalidad_id INTEGER,
   puesto_id INTEGER,
  FOREIGN KEY (municipalidad_id) 
      REFERENCES MUNICIPALIDAD (municipalidad_id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION,
   FOREIGN KEY (puesto_id) 
      REFERENCES PUESTO (puesto_id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION
);
-- Activo las restricciones de clave foranea nuevamente
PRAGMA foreign_keys = ON;