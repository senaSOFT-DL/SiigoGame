//Import socket
import { Namespace, Server, Socket } from 'socket.io';
import {sio} from './io';
//Import interface
import { Socket as DataSocket, SocketJoinUser } from '../interfaces/Socket';
import { DataRoom } from '../interfaces/Room';
import { DataUser } from '../interfaces/User';
//Import services
import { createIdRoom, isValidatedIdRoom, saveRoomService } from '../services/room.service';
import { getUsers, isValidAddUsers } from '../services/user.service';
import { getResponse } from '../services/getResponse.service';
import { addNameUser } from '../services/user.service';
//Import controllers
//Import enums
import {TypeRole} from '../types/enums';

//Deconstruction
const {Exist,Room,User} = TypeRole;

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
            console.table(data);
            //Disconected
            socket.on('disconnect', ()=>{
                console.log(`Disconnected: ${socket.id}`);
            });
            //?Create room 
            socket.on('room:create', async (owner:string, callback)=>{
                //Create id 
                console.log('--CREATE ROOM--');
                const _idRoom:string = createIdRoom();
                const _owner:string = owner;
                //save room
                const result:boolean|string = await saveRoomService({_idRoom, _owner,_namesUsers: []});
                console.log(`Result idRoom: ${result}`);
                //Validamos resultado
                if(!result) return callback({
                    //Invalid response server - error server
                    ...getResponse(502)
                });
                // Else
                console.log(`Room Create ✔ =\t${_idRoom}`);
                return callback({
                    roomId:_idRoom,
                    ...getResponse(200)
                });
                // await createRoom(data,callback);
            });
            //?Create User
            // socket.on('user:create', async (data:DataUser, callback) => {
            //     // TODO-Validate Data

            //     //Validamos que el id de la sala exista
            //     const response:boolean|null = await isValidatedIdRoom(data._idRoom);
            //     if(!response) return callback({
            //         //Not found
            //         ...getResponse(404)
            //     })
            //     //Save nameUser Room
            //     const result:boolean|null|string = await addNameUser(data._idRoom, data._name);
            //     if(!result)return callback({
            //         msg:Room,
            //         ...getResponse(404)
            //     });
            //     if(result === 'exist') return callback({
            //         msq:User,
            //         ...getResponse(600)
            //     });
            //     if(result === true) return callback({
            //         ...getResponse(200)
            //     });
            //     //Connect user
            //     socket.join(data._idRoom);
            //     return callback({
            //         ...getResponse(200)
            //     })
            // });
            //?Cound Users
            socket.on('users:count',async (idRoom:string, callback)=>{
                //Validated idRoom
                const result:boolean|null = await isValidatedIdRoom(idRoom);
                if(!result)return callback({
                    msg:Room,
                    ...getResponse(404)
                });
                //Get number users
                const resultUsers:number|null = await getUsers(idRoom);
                //Validate
                if(!resultUsers)return callback({
                    msg:Room,
                    ...getResponse(404)
                })
                console.log(`Room:${idRoom} - Users Room: ${resultUsers}`);
                return callback({
                    Users:resultUsers,
                    ...getResponse(200)
                });
            });
            //?user join
            socket.on('user:join',async (data:SocketJoinUser, callback)=>{
                const idRoom:string = data.room;
                const nameUser = data.username
                console.log(data);
                
                //Validate idRoom
                const codeValid:boolean|null = await isValidatedIdRoom(idRoom);
                if(!codeValid){
                    console.log(`IdRoom no valido: ${idRoom}`);
                    return callback({
                        msq:Room,
                        ...getResponse(404)
                    })
                };
                console.log(`El IdRoom es valido ${idRoom}`);
                //valid users room
                const countUsers:number|null = await getUsers(idRoom);
                console.log('Users: ',countUsers);
                if(countUsers === null) return;//No hay users
                console.log(`Room: ${idRoom} -> Users:${countUsers}`);
                const isValidate:boolean = isValidAddUsers(countUsers);
                //if valid
                if(!isValidate)return callback({msq:Room,...getResponse(601)})//Full Room
                //else
                //Save nameUser a la sala
                const result:boolean|null|string = await addNameUser(idRoom,nameUser);
                console.log(`->ADD user ${nameUser}`);
                //validate
                //Room not found
                if(!result) return callback({
                    msq:Room,
                    ...getResponse(404)
                });
                //User exist
                if(result === Exist)return callback({
                    mgg:User,
                    ...getResponse(600)
                });
                // All ok
                console.log('All ok');
                console.log('JOIN:. ', data.room);
                console.log(`Entry Room: ${data.room}`);
                callback({
                    msq:Room,
                    ...getResponse(200)
                });
                socket.join(data.room);
                //TODO-Unimos user to room 
            });
        });
};