const express = require('express')
const app = express()
const port = 8080

app.get('/', function (req, res) {
  res.send('Home page')
})

app.get('/hola-mundo', function (req, res) {
  res.send('Hello World')
})

app.get('*', function (req, res) {
  res.send('Error 404 | Not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})