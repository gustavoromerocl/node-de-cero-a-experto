const fs = require('fs')
const colors = require('colors/safe');

const crearArchivo = async (base = 5, listar = false, limit = 10) => {
  try {
    let salida = ''

    for (let index = 1; index <= limit; index++) {
      salida += `${base} x ${index} = ${base * index}\n`
    }

    if (listar) {
      console.log("==================================")
      console.log(colors.rainbow(`          Tabla del ${base}`))
      console.log("==================================")
      console.log(salida)
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida)

    console.log(`tabla-${base}.txt creado`)
    return `tabla-${base}.txt creado`
  } catch (error) {
    throw error
  }

}

module.exports = {
  crearArchivo
}