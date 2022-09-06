import { DataRoom } from "../interfaces/Room";

const Rooms:Array<DataRoom> = [
	{
		idRoom: '9b1deb4d',
		owner: 'juan'
	}
]; 

export const saveRoom = async (Room:DataRoom):Promise<boolean> =>{
	try {
		//ADD room -> Rooms 
		Rooms.push(Room);
	} catch (error) {
		console.error(`ERROR:ADD Room to Rooms`);
		return false;
	}
	return true;
};