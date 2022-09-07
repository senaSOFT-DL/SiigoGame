import { getUsersByIdRoom, saveNameUser } from '../models/data';


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
//Obtemos el numero de Jugadores de una sala
export const getUsers = async (idRoom:string):Promise<number|null> => {
    const resultUsers:number|null = await getUsersByIdRoom(idRoom);
    return resultUsers;
};
//Validar los usuarios 
export const isValidAddUsers = (countUsersRoom:number):boolean => {
    if(countUsersRoom < 7) return true;//Is valid add to user
    return false; // Not valid
}