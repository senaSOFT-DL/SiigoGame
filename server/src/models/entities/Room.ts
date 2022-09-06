import { DataRoom } from '../../interfaces/Room';

//User
export class Room implements DataRoom  {
    //Atributes
    public _idRoom:string;
    public _owner:string;
    public _namesUsers:Array<string> = [];

    constructor(idRoom:string, owner:string, nameUsers:Array<string>){
        this._idRoom = idRoom;
        this._owner = owner;
        this._namesUsers = nameUsers;
    }
    
};