import { DataCards } from './Cards';

export interface DataUser {
    _name:string;
    _idRoom:string;
    _cards?:Array<DataCards>;
}
