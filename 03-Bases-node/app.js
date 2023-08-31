const { crearArchivo } = require('./helpers/multiplicar')
const argv = require('./config/yargs')
console.clear();


console.log('process.argv', process.argv)
console.log('argv', argv)


crearArchivo(argv.b, argv.l, argv.h)
  .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch(error => console.log(error))

