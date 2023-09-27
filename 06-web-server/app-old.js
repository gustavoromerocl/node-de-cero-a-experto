const http = require('http')

http.createServer((req, res) => {
  res.setHeader('Content-Disposition', 'atachment; filename=lista.csv')
  res.writeHead(200, { 'Content-Type' : 'application/csv'})


  res.write('id, nombre\n')
  res.write('1, Gustavo\n')
  res.write('2, Fernando\n')
  res.write('3, Juan\n')
  res.write('4, María\n')
  res.end()
})
.listen( 8080 )

console.log('Escuchando en el puerto', 8080)