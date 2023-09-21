# node-de-cero-a-experto
Plan de carrera Udemy - Fernando Herrera

## 1-Fundamentos de Node 

### Temas de la sección:
La sección se enfoca en los siguientes temas:

- ¿Por qué es tan popular Node?
- ¿Qué es blocking y non-blocking I/O?
- Realizar nuestro primer programa de Node
- Comprender como es que Node resuelve los procesos síncronos y asíncronos

### Preguntas comunes sobre Node 

#### Qué es Node?

Es un entrono de ejecución de javascript construido en el motor v8 de google chrome. Node untiliza un conduccion por eventos, usa un modelo de entradas y salidas que no se bloquean.

- Lenguaje javascript en el backend
- Acceso al sistema de archivos del equipo
- Información del sistema operativo
- Procesos del equipo
- Motor V8 Google 

#### Que puedo hacer con Node?

- Uso de sockets
- Manejo de archivos en filesystem, cargas simultaneas
- Servidores locales y remotos con información en tiempo real
- Conexiones a bases de datos
- Creación de servicios REST en segundos

#### Porqué es tan popular?

- Entradas y salidas que no realizan bloqueos del servidor
- Es sumamente rápido y fácil de configurar
- Más de 470 mil paquetes disponibles (El ecosistema con más librerías en el mundo)
- Sí sabes Javascript ya conoces la mayor parte de Node

### Blocking vs Non Blocking

Non blovking es programagar evitando bloquear los procesos ejecutando todo de forma asíncrona.

(Ejemplo del curso)[https://github.com/Klerith/node-blocking-vs-non-blocking/]


### Ciclo de vida de un proceso en Node

![Alt text](image/callstack.png)

### Nodemon

https://www.npmjs.com/package/nodemon

## 2-Reforzamiento de los temas necesarios para seguir el curso

### Temas de la sección:
La sección se enfoca en los siguientes temas:

- Instalación de paquetes mediante npm
- Reforzamiento de ES6 y ES7
- Let vs Var
- Template literales
- Destructuración
- Funciones de flecha
- Callbacks y callbacks en cadena
- Promesas y promesas en cadena
- Async y Await
- Adicionalmente tendremos varias tareas dentro de la sección para prácticar

## 3-Bases de Node

### Temas de la sección:
La sección se enfoca en los siguientes temas:

- Requerir información de otros archivos
- Requerir paquetes
- Importar archivos personalizados
- NPM
- Install
- Uninstall
- Package.json
- [Yargs](https://www.npmjs.com/package/yargs)
- Recibir parámetros por línea de comando
- [Colores para la consola](https://www.npmjs.com/package/colors)

## 4-Aplicación de consola interactiva: Tareas por hacer

### Temas de esta sección

El objetivo es que creemos una aplicación de consola interactiva, con opciones que se puedan seleccionar con las teclas direccionales, números y con la tecla espaciadora cuando hay multiples opciones.

Puntualmente sería:

- stdin
- stdout
- Ciclos
- [Inquirer](https://www.npmjs.com/package/inquirer)
- Clases en JavaScript
- Archivos JSON
- Fuertemente async y await
- Transformaciones

Esta es una aplicación real que les puede servir mucho cuando tengan que crear alguna aplicación de consola.

## 5-Aplicación de clima - GeoLocation + OpenWeatherMaps

### Temas de la sección:

La sección se enfoca en los siguientes temas:

- Consumo de APIs
- Llamadas HTTP hacia servidores externos
- Paquete request - superficialmente
- Paquete Axios
- [Mapbox places para obtener lugares por nombre](https://www.mapbox.com/)
- [Uso de OpenWeather para obtener el clima](https://openweathermap.org/)
- Aplicación de consola con historial
- Variables de entorno
