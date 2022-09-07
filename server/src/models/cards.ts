
import { Results } from '../interfaces/Cards';

let resulDataTamporaly:Array<Results> = [];

export const addDataCardTemporaly = async (data:Array<Results>) => {
    //Agregamos
    for(let ele of data){
        resulDataTamporaly.push(ele);
    }
    console.log('CANT: ',resulDataTamporaly.length);
};
export const getCards = async () => {
    return resulDataTamporaly.length;
}; 
