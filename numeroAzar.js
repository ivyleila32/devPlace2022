const readline = require('readline-sync');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const min = 0;
const max = 1000;
let guessed = false;
const number = Math.floor(Math.random() * (max + 1 - min) + min);
// Muestro cartel de Inicio
console.log('Bienvenido te invito a descubrir mi numero secreto');
console.log('Para empezar el numero esta entre 0 y 1000');
console.log('No te preocupes, no hay un numero maximo de intentos');
console.log('SUERTE y comencemos el juego');
// Inicio bucle mientras el numero no sea adivinado
while (!guessed) {
  // Pregunto al usuario el numero
  const guess = readline.question('ingrese un numero ');
  // checkeo si es mayor
  if (guess > number) {
    console.log('el numero secreto es MENOR');
    continue;
  }

  // checkeo si es menor
  if (guess < number) {
    console.log('el numero secreto es MAYOR');
    continue;
  }

  // si no se da ninguno de los casos anteriores entonces el usuario adivino
  guessed = true;
}

console.log('ADIVINASTE EL NUMERO SECRETO');
