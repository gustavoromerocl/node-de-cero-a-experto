const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth:       '/api/auth',
      users:      '/api/users',
      categories: '/api/categories'
    }
    
    //Conectar a base de datos
    this.dbConnect()

    //Middlewares
    this.middlewares()

    //routes
    this.routes()
  }

  async dbConnect() {
    await dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors())

    //Lectura y parseo del body
    this.app.use(express.json())

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
}

module.exports = Server;