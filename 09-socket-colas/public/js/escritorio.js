//HTML references
const lbldesktop = document.querySelector('h1')
const btnNew = document.querySelector('button')
const searchParams = new URLSearchParams(window.location.search)
const lblticket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

if (!searchParams.has('desktop')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const desktop = searchParams.get('desktop')

divAlert.style.display = 'none'
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

socket.on('ticket-pendings', (pendings) => {
  lblPendientes.innerText = pendings
})

btnNew.addEventListener('click', () => {
  socket.emit('new-ticket', { desktop }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblticket.innerText = 'Nadie.'
      return divAlert.style.display = ''
    }
    lblticket.innerText = 'Ticket' + ticket.number
  })

  
  // socket.emit('next-ticket', null, (ticket) => {
  //   lblNewTicket.innerText = ticket
  // });
});