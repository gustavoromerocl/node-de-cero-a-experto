const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl()


const socketController = (socket) => {
    socket.emit('last-ticket', ticketControl.last)
    socket.emit('current-state', ticketControl.lastFour)

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next)
    })

    socket.on('new-ticket', ({ desktop }, callback) => {
        console.log(desktop)
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'The desktop is required'
            });
        }

        const ticket = ticketControl.attendTicket(desktop)
        
        socket.broadcast.emit('current-state', ticketControl.lastFour)

        if (!ticket) {
            callback({
                ok: false,
                msg: 'there are no more tickets'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })
}

module.exports = {
    socketController
}

