import { Response } from 'express';

//Consumo Api
export const getCards = () => {
    
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then((res)=>{
            res.json();
        }).then((data)=>{    
            console.log('DATA: API',data);
        }).catch(err=>{
            console.error(`ERROR: Consumo de API:: ${err}`);
        });
};