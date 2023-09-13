const axios = require('axios')

class Busquedas {

  historial = [];

  constructor() {
    
  }

  get paramsMapBox() {
    return {
      'language': 'es',
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5
    }
  }

  async ciudad(lugar = '') {
    console.log('lugar', lugar)
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params: this.paramsMapBox
      })
      const { data } = await instance.get()
      // const { data } = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?types=country%2Cregion&language=es&access_token=pk.eyJ1IjoiZ3VzdGF2b3JvbWVyb2NsIiwiYSI6ImNsbWZqYzgzaDAzcjkzdGxtcjk5czhtdXkifQ.d6bSXr7YAr31grp9n9UWhw')
      console.log('data', data)
      return []
    } catch (error) {
      return []
    }
  }
}





module.exports = Busquedas;