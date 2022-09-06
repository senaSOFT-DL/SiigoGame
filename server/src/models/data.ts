import { DataRoom } from "../interfaces/Room";
import { DataUser } from "../interfaces/User";
import { room } from "../sockets/room";

//Rooms 
const Rooms:Array<DataRoom> = [
	//Default
	{
		_idRoom: '9b1deb4d',
		_owner: 'juan'
	},
]; 
//Users
const Users:Array<DataUser> = [
	//Default
	{
		_name:'carlos',
		_idRoom:'9b1deb4d',
		_cards:[]
	},
];


//Methos 
export const saveRoom = async (Room:DataRoom):Promise<void> =>{
	//ADD room -> Rooms 
	Rooms.push(Room);
};

export const compareID = async (idRoom:string):Promise<null|boolean> => {
	//Obtenemos el id si existe
	const findId:DataRoom|undefined = Rooms.find(ele => ele._idRoom === idRoom);
	//Validated result
	if(!findId)return null; // Not match
	return true;
};
