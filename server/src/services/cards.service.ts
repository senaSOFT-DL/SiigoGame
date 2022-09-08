import { Results, Stats } from '../interfaces/Cards';
//!CAMBIO
import { addDataCardTemporaly, getCards, getCountCart } from '../models/cards';
import { Card } from '../models/entities/Card';

//Add cards
export const addDataTemporaly = async (temporaly:Array<Results>) => {
	//!CAMBIO
	await addDataCardTemporaly(temporaly);
	const data = getCountCart();   
};
//!CAMBIO
export const createCard = async(ids:Array<Array<string>>,name:string, url:string):Promise<Card> => {
	// console.log(stat);
	// for(let ele of stat){

	// }
	//TODO-IDS
	// for (let i = 0; i < 4; i++) {
	// 	for (let j = 0; j < 8; j++) {
	// 		const id = ids[i][j];
	// 		console.log(id);
			
	// 	};
	// };
	// console.log(hp);
	//Create card
	const card = new Card('1A',name,url,0,0,0,0);
	// console.log('CARD:: ',card);
	return card;
};
//Obtenemos las cartas
export const getAllCards = async ():Promise<Array<Card>> => {
	const cards:Array<Card> = await getCards();
	return cards;
}