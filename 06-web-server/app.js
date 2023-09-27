const express = require('express')
const app = express()
const port = 8080

//Servir contenido estático
app.use( express.static('public'))

app.get('/hola-mundo', function (req, res) {
  res.send('Hello World')
})

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})