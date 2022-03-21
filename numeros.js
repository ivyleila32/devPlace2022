const readline = require('readline-sync');
let max = 0,
  min = Number.POSITIVE_INFINITY,
  sum = 0,
  qty = 0;
while (true) {
  // solicito el numero al usuario
  const numero = Number(readline.question('ingrese un numero (-1 para salir)'));
  // si ingreso -1 salgo del bucle
  if (numero == -1) break;

  if (numero > max) {
    max = numero;
  }
  if (numero < min) {
    min = numero;
  }
  sum += numero;
  qty++;
}
console.log('el numero max es: ', max);
console.log('el numero min es: ', min);
console.log('la suma total de los numeros es: ', sum);
console.log('el total de numeros ingresados es: ', qty);
