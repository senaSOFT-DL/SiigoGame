import { Card } from "../models/entities/Card";
import { DataCards } from "./Cards";

export interface DataRoom {
    _idRoom:string;
    _owner:string;
    _namesUsers:Array<string|null>;
}
export interface DataGameRoom{
    idRoom:string;
    username: string;
    cards:Array<Card>;
}