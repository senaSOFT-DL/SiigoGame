import { Response } from 'express';
import { DataApi } from '../interfaces/Cards';

//Consumo Api
export const getCards = async () => {
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=32')
        .then((res)=>{
            res.json();
        }).then((data:DataApi|void)=>{    
            if(!data)return; //Datos null
            console.log('DATA: API',data.results);
        }).catch(err=>{
            console.error(`ERROR: Consumo de API:: ${err}`);
        });
};