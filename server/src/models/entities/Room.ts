import { DataRoom } from '../../interfaces/Room';

//User
export class Room implements DataRoom  {
    //Atributes
    public _idRoom:string;
    public _owner:string;

    constructor(idRoom:string, owner:string){
        this._idRoom = idRoom;
        this._owner = owner;
    }
    
};