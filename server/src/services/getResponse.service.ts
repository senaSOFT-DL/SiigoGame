import { ResponseMessage } from '../interfaces/responseMenssage';

//Generated codes
const responses:ResponseMessage[] = [
	//Success
	{status:'Status: sucessfull', code:200},
	//Cliente
	{status:'Status: Not found', code:404},
	//Server
	{status:'Status: Invalid Response server', code:502},
	//Create Codes
	{status:'Status: User exist!', code:600}
];
//Get codes
export const getResponse = (code:number):ResponseMessage|undefined => {
	return responses.find(ele => ele.code === code);
}
