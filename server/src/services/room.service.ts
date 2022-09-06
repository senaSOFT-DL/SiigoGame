//Import hex-generator
import {v4} from 'uuid';
import { DataRoom } from '../interfaces/Room';
import { compareID, saveRoom } from '../models/data';
import { Room } from '../models/entities/Room';

export const createIdRoom = ():string => {
	//Create id room hexa
	const generate:string = v4();
	//Obtenemos solo los primeros
	const id:string = generate.split('-')[0];
	return id;
};

export const saveRoomService = async (data:DataRoom):Promise<boolean|DataRoom> => {
	//Validate data
	const _owner = data._owner.toLowerCase(); 
	
	//Create room 
	const room:DataRoom = new Room(data._idRoom,_owner);
	//Save data room
	try {
		//SAVE room -> Rooms 
		await saveRoom(room);
	} catch (error) {
		console.error(`ERROR:ADD Room to Rooms`);
		return false;
	}
	//All ok
	return room;
};

export const isValidatedIdRoom = async (idRoom:string):Promise<boolean|null> => {
	//Compared id 
	return await compareID(idRoom);
};

