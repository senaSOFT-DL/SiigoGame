//Import socket
import { Namespace, Server, Socket } from 'socket.io';
import {sio} from './io';
//Import interface
import { Socket as DataSocket, SocketJoinUser } from '../interfaces/Socket';
import { DataRoom } from '../interfaces/Room';
import { DataUser } from '../interfaces/User';
//Import services
import { createIdRoom, getUserdByIdRoom, isValidatedIdRoom, saveRoomService } from '../services/room.service';
import { getUsers, isValidAddUsers } from '../services/user.service';
import { getResponse } from '../services/getResponse.service';
import { addNameUser } from '../services/user.service';
//Import controllers
//Import enums
import {TypeRole} from '../types/enums';
import { getCards, getDatahabilitiesCards } from '../controllers/pokeApi.controller';
import { getUsersByIdRoom, joinDataGamen } from '../models/data';
import { getCardsTempo } from '../models/cards';
import { Results } from '../interfaces/Cards';
import { Card } from '../models/entities/Card';

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

            //?Cantidad de usurarios
            const emitUsers = async (idRoom:string):Promise<void> => {
                const result = await getUsersByIdRoom(idRoom);
                //CANTIDAD DE USUARIOS
                console.log('USERS: ',result);
                room.emit('players', result)
            }

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
                //!CAMBIO
                try {
                    //Obtenemos cartas 
                    await getCards();
                } catch (error) {
                    throw new Error(`ERROR: get Carts API:: ${error} `);
                    
                }
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
                console.log('--USER|JOIN--');
                const idRoom:string = data.room;
                const nameUser = data.username
                //Validate idRoom
                const codeValid:boolean|null = await isValidatedIdRoom(idRoom);
                if(!codeValid){
                    console.log(`El IdRoom ${idRoom} NO es valido`);
                    return callback({
                        msq:Room,
                        ...getResponse(404)
                    })
                };
                console.log(`El IdRoom ${idRoom} es valido`);
                //valid users room
                const countUsers:number|null = await getUsers(idRoom);
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
                await emitUsers(idRoom);
                //TODO-Unimos user to room 
            });
            //?Start Game
            socket.on('game:start',(callback)=>{
                //Obtenmos las cartas
                getCards();
            });
            //?Ready Game
            socket.on('ready', async (idRoom:string, callback) => {
                //Centinela
                let cards:Array<Card>;
                try {
                    //Obtenemos cartas con habilidades
                    //OBTENEMOS CARTAS TEMPORALES
                    const cardsTempo:Array<Results> = await getCardsTempo();
                    //OBTENEMOS LAS CARTAS CON CREADAS
                    cards = await getDatahabilitiesCards(cardsTempo);
                } catch (error) {
                    throw new Error(`ERROR: get Data Carts TEMPO:: ${error} `);
                }
                //OBTENGO numero de users
                const users:Array<string|null>|null = await getUserdByIdRoom(idRoom);
                if(!users)return;
                console.log('VALIDATE ARRAY');
                if(typeof users != 'string')return;//EL ARRAY NO ES STRING
                console.log('PASS VALIDATE');
                //Pasamos los datos a construir
                const dataGame = await joinDataGamen(idRoom,cards,users);
                console.log('DATAGAME:: ',dataGame);
                callback({
                    user:dataGame,
                    ...getResponse(200)
                })
                console.log('STARTED GAME');
                socket.to(idRoom).emit('start',{msg:'started game'});
            });
        });
};