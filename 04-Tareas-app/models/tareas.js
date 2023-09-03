const Tarea = require("./tarea")

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */
class Tareas {
  _listado = {}

  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  constructor() {
    this._listado = {}
  }

  cargarTareasFromArray(tareas = []) {
    console.log(tareas);
    tareas.forEach(tarea => this._listado[tarea.id] = tarea)
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }
}

module.exports = Tareas