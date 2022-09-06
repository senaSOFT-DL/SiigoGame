//Import socket
import { Namespace, Server, Socket } from 'socket.io';
import {sio} from './io';
//Import interface
import { Socket as DataSocket } from '../interfaces/Socket';
import { createIdRoom, saveRoomService } from '../services/room';
import { DataRoom } from '../interfaces/Room';

export const room = (io:Server):void =>{
    //Create nameSpace
    const room:Namespace = sio.of('/room')
        //Connection
        .on('connection', async (socket:Socket) => {
            console.log('User connected');
            // Get id socket
            const data:DataSocket = {
                socketId: socket.id
            }

            //Disconected
            socket.on('disconnect', ()=>{
                console.log(`Disconnected`);
            });
            
            //Evenet create room 
            socket.on('room:create', async (data:DataRoom)=>{
                //Create id 
                const idRoom:string = createIdRoom();
                const owner:string = data.owner;
                //save room
                const result = await saveRoomService({idRoom,owner});
                
            });


        });
};