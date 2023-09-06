require('colors')
const {
  guardarDB,
  leerDB
} = require('./helpers/guardarArchivo')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrar,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')

const main = async () => {
  console.log('Hola mundo')
  let opt = ''
  let tareas = new Tareas()
  let dbData = leerDB()

  if (dbData) {
    tareas.cargarTareasFromArray(dbData)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const desc = await leerInput('Descripción:')
        tareas.crearTarea(desc)
        console.log(desc)
        break;
      case 2:
        tareas.listadoCompleto()
        break;
      case 3:
        tareas.listarPendientesCompletadas()
        break;
      case 4:
        tareas.listarPendientesCompletadas(false)
        break;
      case 5:
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break;
      case 6:
        const id = await listadoBorrar(tareas.listadoArr)
        if (id !== 0) {
          const ok = await confirmar('¿Está seguro?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr)

    if (opt !== 0) await pausa()
  } while (opt !== 0);
}

main()