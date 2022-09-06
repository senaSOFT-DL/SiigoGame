//Import socket
import { Namespace, Server, Socket } from 'socket.io';
import {sio} from './io';
//Import interface
import { Socket as DataSocket } from '../interfaces/Socket';
import { DataRoom } from '../interfaces/Room';
import { Callback } from '../interfaces/callback';
import { DataUser } from '../interfaces/User';
//Import services
import { createIdRoom, getUsers, isValidatedIdRoom, saveRoomService } from '../services/room.service';
import { getResponse } from '../services/getResponse.service';
import { addIdUser } from '../services/user.service';
//Import controllers

export const game = (io:Server):void =>{
    //Create nameSpace
    const room:Namespace = sio.of('/siigoGame')
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
            //?Create room 
            socket.on('room:create', async (data:DataRoom, callback)=>{
                //Create id 
                const _idRoom:string = createIdRoom();
                const _owner:string = data._owner;
                //save room
                const result:boolean|DataRoom = await saveRoomService({_idRoom, _owner,_namesUsers: []
                });
                //Validamos resultado
                if(!result) return callback({
                    //Invalid response server - error server
                    ...getResponse(502)
                });
                //Else
                return callback({
                    ...getResponse(200)
                });
                // await createRoom(data,callback);
            });
            //?Create User
            socket.on('user:create', async (data:DataUser, callback) => {
                // TODO-Validate Data

                //Validamos que el id de la sala exista
                const response:boolean|null = await isValidatedIdRoom(data._idRoom);
                if(!response) return callback({
                    //Not found
                    ...getResponse(404)
                })
                //Save nameUser Room
                const result:boolean|null|string = await addIdUser(data._idRoom, data._name);
                if(!result)return callback({
                    msg:'Room',
                    ...getResponse(404)
                });
                if(result === 'exist') return callback({
                    msq:'User',
                    ...getResponse(600)
                });
                if(result === true) return callback({
                    ...getResponse(200)
                });
                //Connect user
                socket.join(data._idRoom);
                return callback({
                    ...getResponse(200)
                })
            });

            //?Cound Users
            socket.on('users:count',async (idRoom:string, callback)=>{
                //Validated idRoom
                const result:boolean|null = await isValidatedIdRoom(idRoom);
                if(!result)return callback({
                    msg:'Room',
                    ...getResponse(404)
                });
                //Get number users
                const resultUsers:number|null = await getUsers(idRoom);
                //Validate
                if(!resultUsers)return callback({
                    msg:'Room',
                    ...getResponse(404)
                })
                return callback({
                    Users:resultUsers,
                    ...getResponse(200)
                });
            });
        });
};