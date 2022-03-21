const readline = require('readline-sync');
const generator = require('generate-password');
const minMayusculas = 2;
const minMinisculas = 1;
const minNumeros = 3;
class Password {
  constructor(parametros = { longitud: 8, contraseña: null }) {
    const { longitud, contraseña } = parametros;
    if (contraseña) {
      this.longitud = contraseña.length;
      this.contraseña = contraseña;
    } else {
      this.longitud = longitud;
      this.generarPassword();
    }
  }
  esFuerte() {
    let mayusculas = 0,
      minusculas = 0,
      numeros = 0;
    for (let i = 0; i < this.contraseña.length; i++) {
      const caracter = this.contraseña[i];
      if (isNaN(caracter)) {
        if (caracter.toUpperCase() === caracter) mayusculas++;
        if (caracter.toLowerCase() === caracter) minusculas++;
        continue;
      }
      numeros++;
    }

    return (
      mayusculas > minMayusculas &&
      minusculas > minMinisculas &&
      numeros > minNumeros
    );
  }
  generarPassword() {
    this.contraseña = generator.generate({
      length: this.longitud,
      numbers: true,
      strict: true,
    });
  }
  getContraseña() {
    return this.contraseña;
  }
  getLongitud() {
    return this.longitud;
  }
  setLongitud(longitud) {
    this.longitud = longitud;
  }
}
/*
  MODOS DE USO: (En Javascript no se permite tener mas de un constructor)
    Le paso longitud al constructor y me genera un pass
      const password = new Password({ longitud: 10 }); 
    Le paso un password al constructor 
      const password = new Password({ contraseña: '1234abcABC' });
*/

const userPass = readline.question('Ingrese su password: ', {
  hideEchoBack: true,
});
const password = new Password({ contraseña: userPass });
const esFuerte = password.esFuerte();
console.log(`El password ingresado ${esFuerte ? '' : 'NO'}es fuerte`);
