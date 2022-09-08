import { Results, Stats } from '../interfaces/Cards';
import { addDataCardTemporaly, getCards, getCountCart } from '../models/cards';
import { Card } from '../models/entities/Card';

//Add cards
export const addDataTemporaly = async (temporaly:Array<Results>) => {
	await addDataCardTemporaly(temporaly);
	const data = getCountCart();   
};
export const createCard = async(id:string,name:string, url:string):Promise<Card> => {
	// console.log(hp);
	//Create card
	const card = new Card(id,name,url,0,0,0,0);
	console.log('CARD:: ',card);
	return card;
};
export const createCard2 = async(ids:Array<Array<string>>,princiData:Array<Results>,itera:number,count:number):Promise<Card> => {
	console.log(itera,'-', count);
	let getItera = itera;
	let i = count;
	let j = 0;
	// let j = ;
	
	
	if (i < 8){
		console.log(ids[getItera][count]);
	}
	// else if(i >= 8){
	// 	i = 0;
	// 	console.log(getItera);
	// 	console.log('-> ',ids[getItera][i]);
	// 	// i =+1;
	// 	// for (let index = getItera; index < 8; index++) {
	// 	// 	console.log('ITERANDO:',getItera, index);
			
	// 	// 	console.log(ids[getItera][index]);
	// 	// 	getItera = getItera + 1;
	// 	// }
	// 	// if(i === 0){
	// 	// 	i = i +1;
	// 	// 	console.log('-> ',ids[getItera][i]);
	// 	// }
	// }
	//Create card
	const card = new Card('1A','','',0,0,0,0);
	// console.log('CARD:: ',card);
	return card;
};
//Obtenemos las cartas
export const getAllCards = async ():Promise<Array<Card>> => {
	const cards:Array<Card> = await getCards();
	return cards;
}