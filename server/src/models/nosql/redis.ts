//Import cli-redis
import { redisClient } from '../../config/connection/redis/connect';

export const saveIdroomRedis = async (idRoom:string,owner:string) => {
	//Buscamos si el Dato existe
	const getData:string|null = await redisClient.get(idRoom);
	console.log(`Dato obtenido redis: ${getData}`);
	//Validamos si el id ya existe
	if(getData){console.log('DATA FOUND, EXISTS!'); return null;}//Ya existe el id
	//No existe el id 
	try {
		const assign : string | null = await redisClient.set(idRoom, JSON.stringify({
			idRoom:owner
		}));
		console.log('Code recover: ',assign);
	} catch (error) {
		console.log('Error a asingar el codigo-> ',error);
		return false;
	}
	// Damos expiracion al dato
	const resultsExpire = await exprireData(idRoom); 
	if(!resultsExpire) return false;//Algo salio mal
	//All ok
	return true;
};
// Expiracion de dato
const exprireData = async (idRoom : string) : Promise<boolean> => {
	// Tiempo de expiracion
	// * 1m -> 60s
	// *** (segundos * minutos)
	const segundos = (60 * 10); 
	try {
		const expireData : boolean = await redisClient.expire(idRoom,segundos);
		console.log(`Exprire Data: ${expireData} en ${segundos}s`);
	} catch (error) {
		console.log(`ERROR en asignar expiracion a codigo>> ${error}`);
		return false;
	}
	//ALL OK
	return true;
};
//?VALIDATED CODE
export const isValidatedCode = async (idRoom : string) : Promise<null|undefined|object> =>{
	//TODO-> ESTO SE PUEDE HACER MEJOR, BUSCAR FORMA
	//Buscamos todos los que coincidan
	const response : string[] = await redisClient.keys(idRoom);
	console.log('Datos de Redis: ',response);
	//IdRoom bandera
	let getIdRoom : string | null = null;
	//Pasamos por cada dato obtenido
	for(const ele of response){
		//Buscamos el dato 
		const data = await redisClient.get(ele);
		//No hay datos
		if(!data) return undefined;
		//Parseamos el objeto
		const valuesData = JSON.parse(data);
		//Validamos si CODIGO coincide con el codigo ingresado
		if(valuesData.idRoom === idRoom) {
			//Codigo que coincide
			getIdRoom = valuesData.code; 
		}
	}
	//console.log('codeRedis: ',codeRedis,'\nemail: ',email,'\nrol: ',rol);
	if(!idRoom) return null;//Codigo No valido
	//Datos de Redis
	const dataRedis = {
		idRoom: idRoom,
	};
	//Codigo valido
	return dataRedis;
};