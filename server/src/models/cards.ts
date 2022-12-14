import { Results, Stats } from '../interfaces/Cards';
import { createCard, createCard2 } from '../services/cards.service';
import { Card } from './entities/Card';
const resulDataTamporaly:Array<Results> = [];
//DATA STATS CARD
const stats:Array<Stats> = [] ;
//DATA CARD
const cards:Array<Card> = [];
//IDS
// const ids:Array<Array<string>> = [
//     ['1A','1B','1C','1D','1E','1F','1G','1H'],
//     ['2A','2B','2C','2D','2E','2F','2G','2H'],
//     ['3A','3B','3C','3D','3E','3F','3G','3H'],
//     ['4A','4B','4C','4D','4E','4F','4G','4H'],
// ];

const ids:Array<Array<string>> = [
    ['1A','1B','1C','1D','1E','1F','1G','1H','2A','2B','2C','2D','2E','2F','2G','2H','3A','3B','3C','3D','3E','3F','3G','3H','4A','4B','4C','4D','4E','4F','4G','4H']
];

export const addDataCardTemporaly = async (data:Array<Results>) => {
    //Agregamos
    for(let ele of data){
        resulDataTamporaly.push(ele);
    }
};
//Numero de cartas obtenidos temporales
export const getCountCart = async () => {
    return resulDataTamporaly.length;
}; 
//Cratas obtenidas temporales
export const getCardsTempo = async ():Promise<Array<Results>> => {
    return resulDataTamporaly;
};
//ADD STA    TS
export const addStats = (data:Stats) => {
    stats.push(data);
};
//MOstrasmos los stats de las cartas
export const lengthStats = async ():Promise<Array<Card>> => {
    console.log('STATS: ',stats.length);
    await joinDataCard(resulDataTamporaly,stats);
    return cards;
};
//UNIR LOS DATOS
export const joinDataCard = async (princiData:Array<Results>, stats:Array<Stats>) => {
    //PAsa por cada carta
    
    for (let i = 0; i < 32; i++) {
        //Obtenemos cada Step
        const stat:Array<Stats> = [];
        const princi:Results = princiData[i]
        //TODO- OBTENER STATS, validar cada uno y pasarlo
        const getStat = stats[i];
        const id:string = ids[0][i];
        // stat.push(getStat);
        // console.log('-> ', stat);
        // console.log(stat.find(ele => ele.stat ));
        // console.log(princi,'\n',stat);
        //?CREAMOS OBJ CARTA
        //TODO-CAMBIAR PARAM ids -> id
        const newCard:Card = await createCard(id,princi.name,princi.url);
        cards.push(newCard);
    }
};
//OBTENER LAS CARTAS 
export const getCards = async():Promise<Array<Card>> => {
    return cards;
}