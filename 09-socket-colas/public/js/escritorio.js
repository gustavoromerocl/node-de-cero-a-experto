//HTML references
const lbldesktop = document.querySelector('h1')
const btnNew = document.querySelector('button')
const searchParams = new URLSearchParams()

if(!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const desktop = searchParams.get('escritorio')
lbldesktop.innerText = desktop
const socket = io();



socket.on('connect', () => {
  // console.log('Conectado');
  btnNew.disabled = false
});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');
  btnNew.disabled = true
});

socket.on('last-ticket', (last) => {
  // lblNewTicket.innerText = 'Ticket ' + last
})

btnNew.addEventListener('click', () => {
  // socket.emit('next-ticket', null, (ticket) => {
  //   lblNewTicket.innerText = ticket
  // });
});