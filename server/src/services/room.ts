//Import hex-generator
import {v4} from 'uuid';
import { DataRoom } from '../interfaces/Room';
import { saveRoom } from '../models/data';

export const createIdRoom = ():string => {
	//Create id room hexa
	const generate:string = v4();
	//Obtenemos solo los primeros
	const id:string = generate.split('-')[0];
	return id;
};

export const saveRoomService = async (data:DataRoom) => {
	//Validate data
	
	//Save data room
	const result:boolean = await saveRoom(data);
};