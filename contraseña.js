/*Importando libreria de ingreso de datos por teclado*/
const readline = require('readline-sync');

const maxAttemps = 3;
console.log('Bienvenido a continuacion pondremos a prueba su memoria ');
const userPassword = readline.question('Ingrese una contraseña : ', {
  hideEchoBack: true,
});
for (let i = 1; i <= maxAttemps; i++) {
  const intento = readline.question(
    `Vuelva a ingresar su contraseña. (Intento ${i})`,
    { hideEchoBack: true }
  );
  if (intento === userPassword) {
    console.log('Felicitaciones, recordás tu contraseña');
    break;
  }
  if (i === maxAttemps) {
    console.log('Tenes que ejercitar la memoria');
  }
}
readline.keyInPause();
