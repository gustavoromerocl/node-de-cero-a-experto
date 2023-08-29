const { crearArchivo } = require('./helpers/multiplicar')
const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true
  })
  .option('l', {
    alias: 'list',
    type: 'boolean',
    default: false
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'La base debe ser un número'
    return true
  })
  .argv
console.clear();


console.log('process.argv', process.argv)
console.log('argv', argv)


crearArchivo(argv.b, argv.l)
  .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch(error => console.log(error))

