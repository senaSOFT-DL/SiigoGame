import { DataApi, Results, Stats } from '../interfaces/Cards';
import axios from 'axios';
import {addDataTemporaly} from '../services/cards.service';
import { addStats, joinDataCard, lengthStats } from '../models/cards';

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
		//!CAMBIO
		console.log(temporaly);
		await addDataTemporaly(temporaly);
		// console.log(getCards());
};
//!CAMBIOO
//Obtenemos los datos de cada carta para asi hacer un fetch
export const getDatahabilitiesCards = async (data:Array<Results>):Promise<void> => {
	//Pasamos por cada una
	for(let ele of data){
		console.log(ele.url);
		await axios.get(ele.url)
			.then((res)=>{
				const { data } = res ;
				const stats = data.stats as Stats;
				addStats(stats);
				// for(let ele in res){
				// 	console.log(ele);
				// }				
			}).catch(err=>{
				console.error(`ERROR: Get data ${err}`);
			})
	};
	//SHOW STATS
	await lengthStats();
};
