import { ResponseMessage } from '../interfaces/responseMenssage';

//Generated codes
const responses:ResponseMessage[] = [
	//Success
	{msg:'Status: sucessfull', code:200},
	//Cliente
	{msg:'Status: Not found', code:404},
	//Server
	{msg:'Status: Invalid Response server', code:502}
];

//Get codes
export const getResponse = (code:number):ResponseMessage|undefined => {
	return responses.find(ele => ele.code === code);
}
