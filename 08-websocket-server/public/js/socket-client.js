//HTML references
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io()

socket.on('connect', () => {
  // console.log('Conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';

});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
  console.log('!!!', payload)
})
btnSend.addEventListener('click', () => {

  const message = txtMessage.value
  const payload = {
    message,
    id: '123ABC',
    fecha: new Date().getTime()
}

  socket.emit('send-message', payload);

});
