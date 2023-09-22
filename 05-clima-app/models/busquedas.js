const fs = require('fs')

const axios = require('axios')

class Busquedas {

  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB()
  }

  get historialCapitalizado() {
    return this.historial.map( lugar => {
      let palabras = lugar.split(' ');
      palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

      return palabras.join(' ');
    })
  }

  get paramsMapBox() {
    return {
      'language': 'es',
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5
    }
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }
  async ciudad(lugar = '') {
    console.log('lugar', lugar)
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
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

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon }
      })

      const { data } = await instance.get();
      const { weather, main } = data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //Prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return
    }
    this.historial.unshift(lugar.toLocaleLowerCase())

    //Grabar en DB
    this.guardarDB();

  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB() {
    console.log("IN LEER DB")
    if (!fs.existsSync(this.dbPath)) return
    const data  = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const parseData = JSON.parse(data);
    this.historial = parseData.historial;
  }
}





module.exports = Busquedas;