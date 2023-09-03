import {Server, Socket} from 'socket.io'
// const userToSocket = new Map();
//
// io.on('connection', (socket) => {
//   console.log('New client connected')
//   socket.on('register', (userId) => {
//     userToSocket.set(userId, socket.id)
//   })
//
//   // Custom event for sending a message
//   socket.on('sendMessage', (data) => {
//     const targetSocketId = userToSocket.get(data.targetUserId)
//     if (targetSocketId) {
//       io.to(targetSocketId).emit('newMessage', data)
//     }
//   })
//
//   socket.on('disconnect', () => {
//     // Remove the Socket ID when the user disconnects
//     userToSocket.delete(socket.id)
//     console.log('Client disconnected')
//   })
//   // Handle custom events or whatever you need
//   socket.on('sendMessage', (data) => {
//     console.log('sendMessage triggered:', data)
//
//     // Emit the message to all connected clients
//     io.emit('newMessage', data)
//   })
// })
export const configureSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected')

    socket.on('sendMessage', (data) => {
      console.log('Message received:', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}
