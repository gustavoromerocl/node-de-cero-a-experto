const fs = require('fs')

console.clear();
console.log("==================================")
console.log("Tabla del 5")
console.log("==================================")


const base = 5
let salida = ''

for (let index = 1; index <= 10; index++) {
  salida += `${base} x ${index} = ${base * index}\n`
}

console.log(salida)

fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
  if (err) throw error;
  
  console.log(`tabla-${base}.txt creado`)
})