require('colors')
const { guardarDB } = require('./helpers/guardarArchivo')
const { 
  inquirerMenu, 
  pausa,
  leerInput 
} = require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')

const main = async () => {
  console.log('Hola mundo')
  let opt = ''
  const tareas = new Tareas()

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const desc = await leerInput('Descripción:')
        tareas.crearTarea(desc)
        console.log(desc)
        break;
      case 2:
        console.log(tareas.listadoArr)
        break;
    }

    guardarDB(tareas.listadoArr)

    if (opt !== 0) await pausa()
  } while (opt !== 0);
}

main()