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
      return data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }))
    } catch (error) {
      return []
    }
  }
}





module.exports = Busquedas;