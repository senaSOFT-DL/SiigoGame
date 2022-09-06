//Import interface
import { DataUser } from '../../interfaces/User';

//User
export class User implements DataUser {
    //Atributes
    public _id:string;
    public _name:string;
    public _idRoom:string;
    public _cards:Array<object>;

    constructor(id:string, name:string, idRoom:string){
        this._id = id;
        this._name = name;
        this._idRoom = idRoom;
    }

};