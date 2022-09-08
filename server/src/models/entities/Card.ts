//!CAMBIO
import { DataCards, Stats } from '../../interfaces/Cards';

export class Card implements DataCards {

    public id:string;
    public urlImage:string
    public name:string
    public hp: number;
    public attack: number;
    public defense: number;
    public speed: number;
    public gender:string
    
    constructor(id:string,urlImage:string,name:string,hp:number,attack:number,defense:number,speed:number){
        this.id=id;
        this.urlImage=urlImage;
        this.name=name;
        this.hp=hp;
        this.attack=attack;
        this.defense=defense;
        this.speed=speed;
        // this.gender=gender;
    }
}