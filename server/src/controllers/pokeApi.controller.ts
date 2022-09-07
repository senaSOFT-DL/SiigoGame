import { DataApi, Results } from '../interfaces/Cards';
import axios from 'axios';
import {addDataTemporaly} from '../services/cards.service';

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
		//TODO - EL SOCKET ESTA SOBRECARGADO, HACE UN FILTRO Y TODO
		// for(let ele of result){
		//     console.log(`RESULT:: ${ele.name}`);
		// }
		// const [name,url] = result;
		console.log(temporaly);
		await addDataTemporaly(temporaly);
		// console.log(getCards());
};
//Obtenemos los datos de cada carta para asi hacer un fetch
const getDatahabilitiesCards = (data:Array<Results>) => {
	
};
