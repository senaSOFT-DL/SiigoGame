import { DataRoom } from "../interfaces/Room";
import { DataUser } from "../interfaces/User";

//Rooms 
const Rooms:Array<DataRoom> = [
	//Default
	{
		_idRoom: '9b1deb4d',
		_owner: 'juan',
		_namesUsers: []
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
//Comparamos id Room
export const compareID = async (idRoom:string):Promise<null|boolean> => {
	//Obtenemos el id si existe
	const findId:DataRoom|undefined = Rooms.find(ele => ele._idRoom === idRoom);
	//Validated result
	if(!findId)return null; // Not match
	return true;
};
//Agregamos id user
export const saveIdUser = async (idRoom:string,nameUser:string):Promise<boolean|null|string> => {
	//Get object by idRoom
	const findRoom:DataRoom|undefined = Rooms.find(el => el._idRoom == idRoom);
	//Validamos si obtenemos la sala
	if(!findRoom)return null; //No encontrado
	//Search name and compared
	const findNameUser:string|undefined = findRoom?._namesUsers?.find(ele => ele === nameUser);
	//Validamos si el nombre se encuentra
	if(!findNameUser)return 'exist'; //Existe el user
	//agregamos a la lista el usuario
	findRoom._namesUsers?.push(nameUser);
	return true;
};
