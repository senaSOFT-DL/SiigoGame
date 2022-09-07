import { DataRoom } from "../interfaces/Room";
import { DataUser } from "../interfaces/User";

//Rooms 
const Rooms:Array<DataRoom> = [
	//Default
	{
		_idRoom: '9b1deb4d',
		_owner: 'juan',
		_namesUsers: ['carlos']
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

//Get Room by id
export const getRoomById = async (idRoom:string):Promise<DataRoom|undefined> => {
	return Rooms.find(ele => ele._idRoom === idRoom);
};
//Save roomm
export const saveRoom = async (room:DataRoom):Promise<void> =>{
	//ADD room -> Rooms 
	const x = Rooms.push(room);
	const result = await saveNameUser(room._idRoom,room._owner);
	if(!result) throw new Error("No se puedo guardar el owner a la sala");
	console.log('Rooms:',Rooms);
};
//Comparamos id Room
export const compareID = async (idRoom:string):Promise<null|boolean> => {
	console.log(`IdRoom a buscar: ${idRoom}`);
	//Obtenemos el id si existe
	const findId:DataRoom|undefined = Rooms.find(ele => ele._idRoom === idRoom);
	console.log(`ID Found: ${findId}`);
	//Validated result
	if(!findId)return null; // Not match
	return true;
};
//Agregamos id user
export const saveNameUser = async (idRoom:string,nameUser:string):Promise<boolean|null|string> => {
	//Get object by idRoom
	const findRoom:DataRoom|undefined = Rooms.find(el => el._idRoom == idRoom);
	//Validamos si obtenemos la sala
	if(!findRoom)return null; //Sala No encontrada
	//Search name and compared
	const listusers = findRoom._namesUsers;
	if(!listusers)return null;
	console.log(listusers.length);
	if(listusers.length === 0){
		//agregamos a la lista el usuario
		findRoom._namesUsers?.push(nameUser);
		return true;
	}
	//Else
	const findNameUser = listusers.find(ele => ele === nameUser);
	let foundUser;
	for(let ele of listusers){
		// console.log('User',ele)
		if(ele === nameUser){
			foundUser = ele;
		}
	}
	//Validamos si el nombre se encuentra
	if(foundUser)return 'exist'; //Existe el user
	//agregamos a la lista el usuario
	listusers.push(nameUser);
	console.log(Rooms);
	
	return true;
};
//Obtenemos los usuarios de una sala
export const getUsersByIdRoom = async (idRoom:string):Promise<number|null> => {
	//Get Room by id
	const findRoom:DataRoom|undefined = await getRoomById(idRoom);
	//Validate
	if(!findRoom) return null;//No hay salas con este id
	const users:Array<string|null> = findRoom._namesUsers;
	//long
	return users.length || 0;
};
