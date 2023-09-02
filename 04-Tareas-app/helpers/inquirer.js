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
        name: '1. Crear tarea'
      },
      {
        value: 2,
        name: '2. Listar tareas'
      },
      {
        value: 3,
        name: '1. Listar tareas completadas'
      },
      {
        value: 4,
        name: '4. Listar tareas pendientes'
      },
      {
        value: 5,
        name: '1. Completar tareas'
      },
      {
        value: 6,
        name: '1. Borrar tarea'
      },
      {
        value: 0,
        name: '0. Salir'
      },
    ]
  }
]

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

module.exports = {
  inquirerMenu,
  pausa
}