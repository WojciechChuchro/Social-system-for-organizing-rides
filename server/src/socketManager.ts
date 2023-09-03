import {Server, Socket} from 'socket.io'

export const configureSocket = (io: Server) => {
  const userToSocket = new Map()

  io.on('connection', (socket: Socket) => {
    console.log('New client connected')
    socket.on('register', (userId) => {
      userToSocket.set(userId, socket.id)
    })

    socket.on('sendMessage', (data) => {
      const targetSocketId = userToSocket.get(data.targetUserId)

      if (targetSocketId) {
        io.to(targetSocketId).emit('newMessage', data)
      }
    })

    socket.on('disconnect', () => {
      userToSocket.delete(socket.id)
      console.log('Client disconnected')
    })

    socket.on('sendMessage', (data) => {
      console.log('sendMessage triggered:', data)

      io.emit('newMessage', data)
    })
  })
}
