const fs = require('fs');
const { join } = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});
const filename = './empleados-municipales.db';
// cargo archivo sql de creacion de tablas
const dataSql = fs.readFileSync('./create-tables.sql').toString();
(async () => {
  // abro la conexion
  const db = await open({ filename, driver: sqlite3.Database });

  await db.exec(dataSql);

  class Puesto {
    constructor(nombre = '', id = null) {
      this.id = id;
      this.nombre = nombre;
    }
    async persistir() {
      const { lastID } = await db.run(
        `INSERT INTO PUESTO (nombre) VALUES ("${this.nombre}")`
      );

      this.id = lastID;
    }
  }
  class Municipalidad {
    constructor(nombre = '', id = null) {
      this.id = id;
      this.nombre = nombre;
    }
    async persistir() {
      const { lastID } = await db.run(
        `INSERT INTO MUNICIPALIDAD (nombre) VALUES ("${this.nombre}")`
      );
      this.id = lastID;
    }
  }

  class Empleado {
    constructor(
      nombre = '',
      apellido = '',
      telefono = '',
      email = '',
      salario = 0.0,
      antiguedad = 0,
      municipalidad = null,
      puesto = null,
      id = null
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
      this.email = email;
      this.salario = salario;
      this.antiguedad = antiguedad;
      this.municipalidad = municipalidad;
      this.puesto = puesto;
    }
    async persistir() {
      const { lastID } =
        await db.run(`INSERT INTO EMPLEADO (nombre, apellido, telefono, email, salario, antiguedad, municipalidad_id, puesto_id)
                      VALUES ("${this.nombre}","${this.apellido}","${this.telefono}","${this.email}",${this.salario},${this.antiguedad},${this.municipalidad.id},${this.puesto.id})`);
      this.id = lastID;
    }
  }

  // Ingresar datos Ficticios
  // Municipios
  const muniGralPuerredon = new Municipalidad('General Pueyrredon');
  const muniGralAlvarado = new Municipalidad('General Alvarado');
  const muniMarChiquita = new Municipalidad('Mar Chiquita');
  const municipalidades = [
    muniGralPuerredon,
    muniGralAlvarado,
    muniMarChiquita,
  ];
  // Uso Promise.all para poder esperar con await a que se persistan las munis
  await Promise.all(
    municipalidades.map(async (muni) => {
      await muni.persistir();
    })
  );
  // Puestos
  const puestoIntendente = new Puesto('Intendente');
  const puestoConcejal = new Puesto('Consejal');
  const puestos = [puestoIntendente, puestoConcejal];
  // Hago lo mismo para los puestos
  await Promise.all(
    puestos.map(async (puesto) => {
      await puesto.persistir();
    })
  );
  // Empleados
  const empleados = [
    new Empleado(
      'Jorge',
      'Garcia',
      '25411234123',
      'jgarcia@gmail.com',
      10500,
      10,
      muniGralAlvarado,
      puestoConcejal
    ),
    new Empleado(
      'maria',
      'perez',
      '2234676578',
      'mperez@gmail.com',
      75000,
      13,
      muniGralPuerredon,
      puestoIntendente
    ),
    new Empleado(
      'Mario',
      'Sanchez',
      '22372837287',
      'msanchez@gmail.com',
      100000,
      10,
      muniMarChiquita,
      puestoIntendente
    ),
  ];
  // Hago lo mismo para los empleados
  await Promise.all(
    empleados.map(async (empleado) => {
      await empleado.persistir();
    })
  );

  // consulta

  const result = await db.all(
    `SELECT 
      EMPLEADO.nombre,
      EMPLEADO.apellido,
      EMPLEADO.telefono,
      EMPLEADO.email,
      EMPLEADO.antiguedad,
      EMPLEADO.salario,
      MUNICIPALIDAD.nombre as 'municipalidad',
      PUESTO.nombre as 'puesto'
      FROM EMPLEADO 
      INNER JOIN MUNICIPALIDAD ON MUNICIPALIDAD.municipalidad_id = EMPLEADO.municipalidad_id
      INNER JOIN PUESTO ON PUESTO.puesto_id = EMPLEADO.puesto_id
      WHERE EMPLEADO.salario > 70000 AND EMPLEADO.antiguedad BETWEEN 10 AND 15`
  );
  console.log(
    'Listado de Empleados con salario mayor a $70.000 y antiguedad entre 10 y 15 años:'
  );
  result.forEach((fila) => {
    console.log(
      `
      EMPLEADO: ${fila.nombre}, ${fila.apellido}
      TELEFONO: ${fila.telefono}  E-MAIL: ${fila.email}
      MUNICIPALIDAD: ${fila.municipalidad}  PUESTO: ${fila.puesto}
      ANTIGUEDAD: ${fila.antiguedad}  SALARIO: ${formatter.format(fila.salario)}
      `
    );
  });
  console.log('Fin del Listado');
})();
