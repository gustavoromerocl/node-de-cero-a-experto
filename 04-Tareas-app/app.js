require('colors')
const { inquirerMenu, pausa } = require('./helpers/inquirer')
const Tarea = require('./models/tarea')

const main = async () => {
  console.log('Hola mundo')
  let opt = ''
  do {
    opt = await inquirerMenu()
    console.log({ opt })
    if (opt !== 0) await pausa()
  } while (opt !== 0);
}

main()