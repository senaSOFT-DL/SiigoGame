import { Results } from '../interfaces/Cards';
import { addDataCardTemporaly, getCards } from '../models/cards';

//Add cards
export const addDataTemporaly = async (temporaly:Array<Results>) => {
	await addDataCardTemporaly(temporaly);
	const data = getCards();   
};