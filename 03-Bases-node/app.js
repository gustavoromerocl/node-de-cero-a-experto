const { crearArchivo } = require('./helpers/multiplicar')

console.clear();
// const base = 5


const [, , arg3] = process.argv
const [,  base = 5] = arg3.split('=');


crearArchivo(base)
  .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch(error => console.log(error))

