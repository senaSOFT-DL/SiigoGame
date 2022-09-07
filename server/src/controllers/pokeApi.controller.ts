import { Response } from 'express';
import { DataApi, Results } from '../interfaces/Cards';
import axios from 'axios';
import { addDataCardTemporaly } from '../models/cards';

let temporaly:Array<Results> = [];

//Consumo Api
//Get results
export const getCards = async () => {

	await axios.get('https://pokeapi.co/api/v2/pokemon?limit=32')
		.then((res)=>{
			console.log('Obtenmos los datos...');
			const data = res.data as DataApi;
			//Deconstruccion
			const { results } = data;
			// console.log('-> ',results);
			temporaly = results;
		}).catch(err=>{
			console.error(`ERROR: Consumo de API:: ${err}`);
		});
		// for(let ele of result){
		//     console.log(`RESULT:: ${ele.name}`);
		// }
		// const [name,url] = result;
		console.log(temporaly);
		await addDataTemporaly();
		// console.log(getCards());
};
//Obtenemos los datos de cada carta para asi hacer un fetch
const getDataCards = (data:Array<Results>) => {

};
//Add cards
const addDataTemporaly = async () => {
	await addDataCardTemporaly(temporaly);
	// const data = getCards();
	// console.table(data);
};