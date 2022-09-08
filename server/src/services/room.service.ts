//Import hex-generator
import {v4} from 'uuid';
import { DataRoom } from '../interfaces/Room';
import { compareID, getRoomById, getRooms, getUsersByIdRoom, getUsersName, saveRoom } from '../models/data';
import { Card } from '../models/entities/Card';
import { Room } from '../models/entities/Room';
import { User } from '../models/entities/User';
import { saveIdroomRedis } from '../models/nosql/redis';
import { getAllCards } from './cards.service';

export const createIdRoom = ():string => {
	//Create id room hexa
	const generate:string = v4();
	//Obtenemos solo los primeros
	const id:string = generate.split('-')[0];
	return id;
};

export const saveRoomService = async (data:DataRoom):Promise<boolean|string> => {
	//Validate data
	const _owner = data._owner; 
	//TODO-Validate id room, que no exista
	
	//Create room 
	const room:Room = new Room(data._idRoom,_owner,[]);
	//Save data room
	try {
		//SAVE room -> Rooms 
		await saveRoom(room);
		// await saveIdroomRedis(data._idRoom,_owner);
	} catch (error) {
		console.error(`ERROR:ADD Room to Rooms`);
		return false;
	}
	//All ok
	return room._idRoom;
};
//Validamos el id de la sala
export const isValidatedIdRoom = async (idRoom:string):Promise<boolean|null> => {
	//Compared id 
	const result=await compareID(idRoom);
	console.log('RESULT:',result);
	return result;
};

//Get all Rooms
const getAllRooms = ():Array<DataRoom> => {
	return getRooms();
};
//!CAMBIO
const x = [
	{
		user:'juan',
		idroom:'',
		card:[]
	}
];
//Ontenemos los usuaios de una sala
export const getUserdByIdRoom =async (idRoom:string) => {
	let datausers:Array<User>;

	const users:Array<string|null>|undefined = await getUsersName(idRoom);
	console.log('USERS:: ',users);
	if(users === null && users===undefined)return;//USERS null
	if(!users)return;
	const cards:Array<Card> = await getAllCards();
	const userLength:number = users.length;
	console.log('CARDS:: ',userLength);
	//REPARTRIR
	const cantiCardsUser:number = cards.length / userLength;
	console.log(cantiCardsUser);
	//Validate
	if(userLength === 2){
		const cards1:Array<Card> = [];
		const cards2:Array<Card> = [];
		for (let i = 0; i < 16; i++) {
			cards1.push(cards[i]);
			cards.splice(i,1);
		};
		for (let index = 0; index < 16; index++) {
			
			cards2.push(cards[index]);
		}
		console.log(cards1.length);
		console.log(cards1.length);
		//Create object
		// const data:User = {
		// 	_name:users[0],
		// }
		
	}

	
	
	return users;
};