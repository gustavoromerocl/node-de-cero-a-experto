const inquirer = require('inquirer')
require('colors')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      },
    ]
  }
]

const listadoBorrar = async (tareas = []) => {
  const choices = tareas.map(({ id, desc }, index) => {
    const nro = `${++index}.`.green
    return {
      value: id,
      name: `${nro} ${desc}`
    }
  })

  choices.unshift({
    value: 0,
    name: '0.'.green + ' Cancelar'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id
}

const confirmar = async (message) => {
  const questions = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(questions)
  return ok
}

const inquirerMenu = async () => {
  console.clear()
  console.log(`===================================`.green)
  console.log(`        Seleccione una opción`.green)
  console.log(`===================================\n`.green)

  const { option } = await inquirer.prompt(questions)
  return option
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'input',
      message: `Presiona ${'ENTER'.green} para seguir`
    }
  ]
  await inquirer.prompt(question)
  console.log('\n')
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)

  return desc
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map(({ id, desc, completaEn }, index) => {
    const nro = `${++index}.`.green
    return {
      value: id,
      name: `${nro} ${desc}`,
      checked: (completaEn) ? true : false
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(questions)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrar,
  confirmar,
  mostrarListadoChecklist
}