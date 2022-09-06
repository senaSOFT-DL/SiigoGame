//Import interface
import { DataCards } from '../../interfaces/Cards';
import { DataUser } from '../../interfaces/User';

//User
export class User implements DataUser {
    //Atributes
    public _name:string;
    public _idRoom:string;
    public _cards:Array<DataCards>;

    constructor(name:string, idRoom:string){
        this._name = name;
        this._idRoom = idRoom;
    }
    
    //Methos access
    getName(){
        return this._name;
    }
    getIdRomm(){
        return this._idRoom;
    }

};