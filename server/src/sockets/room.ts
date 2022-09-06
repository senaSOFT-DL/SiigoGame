//Import socket
import { Namespace, Server, Socket } from 'socket.io';
import {sio} from './io';
//Import interface
import { Socket as DataSocket } from '../interfaces/Socket';
import { createIdRoom, isValidatedIdRoom, saveRoomService } from '../services/room';
import { DataRoom } from '../interfaces/Room';
import { DataUser } from '../interfaces/User';
import { getResponse } from '../services/getResponse';

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
            //Event create room 
            socket.on('room:create', async (data:DataRoom, callback)=>{
                //Create id 
                const _idRoom:string = createIdRoom();
                const _owner:string = data._owner;
                //save room
                const result:boolean|DataRoom = await saveRoomService({_idRoom,_owner});
                //Validamos resultado
                if(!result) return callback({
                    //Invalid response server - error server
                    ...getResponse(502)
                });
                //Else
                return callback({
                    ...getResponse(200)
                });
            });
            //Create User
            socket.on('user:create', async (data:DataUser, callback) => {
                //Validamos que el id de la sala exista
                const response:boolean|null = await isValidatedIdRoom(data._idRoom);
                if(!response) return callback({
                    //Not found
                    ...getResponse(404)
                })
                return;
            });
        });
};