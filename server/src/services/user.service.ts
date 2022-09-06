import { saveNameUser } from '../models/data';

//Validated id
//Add id to Room
export const addNameUser = async (idRoom:string, nameUser:string):Promise<boolean|null|string> => {
    //Centinela
    let result:boolean|null|string;
    //Add id user 
    try {
        result = await saveNameUser(idRoom, nameUser);
    } catch (error) {
        console.error(`ERROR:: ADD idUser to Room`);
        return false;
    }
    return result;
};
