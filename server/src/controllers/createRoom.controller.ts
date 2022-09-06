import { DataRoom } from "../interfaces/Room";
import { getResponse } from "../services/getResponse.service";
import { createIdRoom, saveRoomService } from "../services/room.service";


export const createRoom = async (data:DataRoom, callback:any) => {
	//Create id 
	const _idRoom:string = createIdRoom();
    const _owner:string = data._owner;
    //save room
    const result:boolean|DataRoom = await saveRoomService({_idRoom,_owner});
    //Validamos resultado
    if(!result) return callback({
    //Invalid response server - error server
    ...getResponse(502)
    });
    //Else
    return callback({
    ...getResponse(200)
    });
};