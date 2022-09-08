import { DataGameRoom, DataRoom } from "../interfaces/Room";
import { DataUser, User } from "../interfaces/User";
import { Card } from "./entities/Card";

//Rooms 
const Rooms:Array<DataRoom> = [
	//Default
	{
		_idRoom: '9b1deb4d',
		_owner: 'juan',
		_namesUsers: ['carlos']
	},
	{
		_idRoom: 'ytgUjoki',
		_owner: 'Andres',
		_namesUsers: ['KAka']
	}
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
//Estructura para almacenar los datos mientras la partida
const roomDataAll:Array<DataGameRoom> = [];


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
	//Validamos si encontro la sala
	if(findId === undefined)return null;//Not match
	console.log(`ID Found::: ${findId._idRoom}`);
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
//Obtenemos los usuarios de una sala -TODOS
export const getUsersByIdRoom = async (idRoom:string):Promise<number|null> => {
	//Get Room by id
	const findRoom:DataRoom|undefined = await getRoomById(idRoom);
	//Validate
	if(!findRoom) return null;//No hay salas con este id
	const users:Array<string|null> = findRoom._namesUsers;
	//long
	return users.length || 0;
};
//OBTENEMOS LAS SALAS
export const getRooms = ():Array<DataRoom> => {
	return Rooms;
}
export const getUsersName = async (idRoom:string):Promise<Array<string|null>|undefined> => {
	const room:DataRoom|undefined = await getRoomById(idRoom);
	//NO escontro la sala
	if(!room) return; undefined//
	const getUserd:Array<string|null> = room._namesUsers;
	return getUserd;
} 
export const joinDataGamen =async (idRoom:string,cards:Array<Card>,users:Array<string|null>):Promise<Array<DataGameRoom>|null> => {
	const cardsAll:Array<Card> = cards;
	console.log('CARDS-LENGHT', cardsAll.length);
	const usernames:Array<string> = [];
	const userLength:number = users.length;
	console.log('USERS-LENGTH:: ',userLength);
	for(let ele of users){
		if(!ele)return null;
		usernames.push(ele);
	}
	//Dividimos para saber cuntas tocan
	const cantiCardsUser:number = cards.length / userLength;
	console.log('Cantidad cartas c/u: ',cantiCardsUser);
	//REPARTRIR
	//Validate si son 2 usuarios
	if(userLength === 2){
		const cards1:Array<Card> = [];
		const cards2:Array<Card> = [];
		for (let i = 0; i < 16; i++) {
			//ADD
			cards1.push(cardsAll[i]);
			//DEL
			const del = cardsAll.splice(i,0);
			console.log('User1-> ',cardsAll[i]);
			console.log('DEL: ',del);
			// console.log('Cantidad agregados: ',i);
		};
		for (let i = 0; i < 16; i++) {
			//ADD
			cards2.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,1);
			console.log('User2-> ',cardsAll[i]);
			// console.log('Cantidad agregados: ',i);
		}
		console.group('LENGTH card add:');
		console.log(cards1.length);
		console.log(cards2.length);
		console.groupEnd();
		//Create object
		const user1:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[0],
			cards:cards1
			
		}
		const user2:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[1],
			cards:cards2
			
		}
		roomDataAll.push(user1);
		roomDataAll.push(user2);
		
	}
	//10 cards c/u
	if(userLength ===3){
		const cards1:Array<Card> = [];
		const cards2:Array<Card> = [];
		const cards3:Array<Card> = [];
		for (let i = 0; i < 10; i++) {
			cards1.push(cardsAll[i]);
			cardsAll.splice(i,0);
		};
		for (let i = 0; i < 10; i++) {
			//ADD
			cards2.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);
		}
		for (let i = 0; i < 10; i++) {
			//ADD
			cards3.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);

		}
		console.log(cards1.length);
		console.log(cards2.length);
		console.log(cards3.length);
		//Create object
		const user1:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[0],
			cards:cards1
			
		}
		const user2:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[1],
			cards:cards2
			
		}
		const user3:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
			
		}
		roomDataAll.push(user1);
		roomDataAll.push(user2);
		roomDataAll.push(user3);

	}
	//c/u 8
	if (userLength === 4) {
		const cards1:Array<Card> = [];
		const cards2:Array<Card> = [];
		const cards3:Array<Card> = [];
		const cards4:Array<Card> = [];
		for (let i = 0; i < 8; i++) {
			cards1.push(cardsAll[i]);
			cardsAll.splice(i,0);
		};
		for (let i = 0; i < 8; i++) {
			//ADD
			cards2.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);
		}
		for (let i = 0; i < 8; i++) {
			//ADD
			cards3.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);

		}
		for (let i = 0; i < 8; i++) {
			//ADD
			cards4.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);

		}
		console.log(cards1.length);
		console.log(cards2.length);
		console.log(cards3.length);
		console.log(cards4.length);
		//Create object
		const user1:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[0],
			cards:cards1
			
		}
		const user2:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[1],
			cards:cards2
			
		}
		const user3:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
		}
		const user4:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
		}
		roomDataAll.push(user1);
		roomDataAll.push(user2);
		roomDataAll.push(user3);
		roomDataAll.push(user4);

	}
	//c/u 6
	if (userLength === 6) {
		const cards1:Array<Card> = [];
		const cards2:Array<Card> = [];
		const cards3:Array<Card> = [];
		const cards4:Array<Card> = [];
		const cards5:Array<Card> = [];
		for (let i = 0; i < 6; i++) {
			cards1.push(cardsAll[i]);
			cardsAll.splice(i,0);
		};
		for (let i = 0; i < 6; i++) {
			//ADD
			cards2.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);
		}
		for (let i = 0; i < 6; i++) {
			//ADD
			cards3.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);

		}
		for (let i = 0; i < 6; i++) {
			//ADD
			cards4.push(cardsAll[i]);
			//DEL
			cardsAll.splice(i,0);

		}
		for (let i = 0; i < 6; i++) {
			cards5.push(cardsAll[i]);
			cardsAll.splice(i,0);
		};
		console.log(cards1.length);
		console.log(cards2.length);
		console.log(cards3.length);
		console.log(cards4.length);
		console.log(cards5.length);
		//Create object
		const user1:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[0],
			cards:cards1
			
		}
		const user2:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[1],
			cards:cards2
			
		}
		const user3:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
		}
		const user4:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
		}
		const user5:DataGameRoom = {
			idRoom:idRoom,
			username:usernames[2],
			cards:cards2
		}
		roomDataAll.push(user1);
		roomDataAll.push(user2);
		roomDataAll.push(user3);
		roomDataAll.push(user4);
		roomDataAll.push(user5);
	}
	return roomDataAll;
}