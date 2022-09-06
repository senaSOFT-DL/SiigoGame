import { Server } from 'socket.io';
import { room } from './room';

// instanciamos Server
const createServer = ():Server => {
    return new Server();
};

//Create Server
const sio:Server =createServer();

//NameSpaces
room(sio);

//Exporting
export {sio};
