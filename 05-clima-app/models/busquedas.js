const axios = require('axios')

class Busquedas {

  historial = [];

  constructor() {
    
  }

  async ciudad(lugar = '') {
    // console.log('lugar', lugar)
    try {
      const { data } = await axios.get('https://reqres.in/api/users?page=2')
      console.log('data', data)
      return []
    } catch (error) {
      return []
    }
  }
}





module.exports = Busquedas;