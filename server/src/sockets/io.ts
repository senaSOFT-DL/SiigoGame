import { Server } from 'socket.io';
import { game } from './room';

// instanciamos Server
const createServer = ():Server => {
    return new Server();
};

//Create Server
const sio:Server =createServer();

//NameSpaces
game(sio);

//Exporting
export {sio};
