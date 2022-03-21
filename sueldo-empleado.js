const readline = require('readline-sync');

const amountByYear = 30;
let totalAmount = 0;

const hourValue = readline.question('Ingrese el valor de hora trabajada: ');
const name = readline.question('Ingrese el nombre del empleado: ');
const yearsWorked = readline.question(
  'Ingrese los años de antiguedad del empleado: '
);
const hoursQty = readline.question('ingrese la cantidad de horas trabajadas: ');

totalAmount += hoursQty * hourValue;

if (yearsWorked > 10) {
  totalAmount += yearsWorked * amountByYear;
}

const message = `
Empleado: ${name}
Antiguedad: ${yearsWorked} años
Total a Cobrar: ${totalAmount}
`;
console.log(message);
