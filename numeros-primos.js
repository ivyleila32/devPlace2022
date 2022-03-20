/*Importando libreria de ingreso de datos por teclado*/
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Bienvenido al sistema de verificación de numeros primos');
readline.question('Ingrese el numero a verificar: ',number=> {
    const esPrimo = number => {
        if (number==0 || number ==1) return false;
        for (let i = 2; i < number; i++){
            if (number % i === 0) return false;
        }
        return true;
    };
    if (esPrimo(number)) {
        console.log('El numero ingresado es PRIMO');
    } else {
        console.log('El numero ingresado es NO PRIMO');
    }
    readline.close()
})