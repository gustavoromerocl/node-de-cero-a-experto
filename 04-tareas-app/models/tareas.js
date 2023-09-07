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

  borrarTarea(id = '') {
    if (this._listado[id]) delete this._listado[id]
  }

  cargarTareasFromArray(tareas = []) {
    console.log(tareas);
    tareas.forEach(tarea => this._listado[tarea.id] = tarea)
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    this.listadoArr.forEach(({ desc, completaEn }, index) => {
      const nro = `${++index}`.green
      completaEn
        ? console.log(`${nro} ${desc} :: ${'Completado'.green}`)
        : console.log(`${nro} ${desc} :: ${'Pendiente'.red}`)
    })
  }

  listarPendientesCompletadas(completadas = true) {
    this.listadoArr
      .filter(({ completaEn }) =>
        completadas
          ? completaEn !== null
          : completaEn === null
      )
      .forEach(({ desc, completaEn }, index) => {
        const nro = `${++index}`.green
        completaEn
          ? console.log(`${nro} ${desc} :: ${'Completado'.green}`)
          : console.log(`${nro} ${desc} :: ${'Pendiente'.red}`)
      })
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id]
      if (!tarea.completaEn) {
        tarea.completaEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(({id}) => {
      if(!ids.includes(id)) this._listado[id].completaEn = null
    })
  }
}

module.exports = Tareas