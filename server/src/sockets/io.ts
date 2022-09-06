import { Server } from 'socket.io';

// instanciamos Server
const createServer = ():Server => {
    return new Server();
};

//Create Server
const sio:Server =createServer();

//Exporting
export {sio};
