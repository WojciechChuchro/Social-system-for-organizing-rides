import { Server, Socket } from 'socket.io';
import Messages from './database/models/messages.model'
interface MessagesInterface {
  driverId: number
  passangerId: number
}
export const configureSocket = (io: Server) => {
  const userToSocket = new Map<number, string>();

  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    // socket.on('register', (userId: Messages) => {
    //   if (userId) {
    //     userToSocket.set(, socket.id);
    //   }
    //
    //   // console.log('user has been registered')
    //   // console.log(userToSocket)
    // });

    socket.on('disconnect', () => {

      console.log('Client disconnected');
    });

    socket.on('sendMessage', async (message) => {
      await Messages.query().insert(message);

      io.emit('newMessage', message);
    });
  });
};
