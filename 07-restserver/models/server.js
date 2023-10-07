const express = require('express')
const cors = require('cors')


class Server {
  constructor(){
    this.app = express()
    this.port = process.env.PORT
    this.usersRoutePath = '/api/users'
    //Middlewares
    this.middlewares()

    //routes
    this.routes()
  }

  middlewares(){
    //CORS
    this.app.use(cors())

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersRoutePath, require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
}

module.exports = Server;