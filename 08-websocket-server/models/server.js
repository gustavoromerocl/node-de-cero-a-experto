const express = require('express')
const cors = require('cors')


class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {}
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);
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

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    // this.app.use(this.paths.auth, require('../routes/auth.routes'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
}

module.exports = Server;