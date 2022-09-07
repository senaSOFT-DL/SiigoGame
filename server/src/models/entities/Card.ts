import { DataCards } from '../../interfaces/Cards';

export class Card implements DataCards {

    public id:string;
    public urlImage:string
    public name:string
    // statistics:
    public gender:string
    
    constructor(id:string,urlImage:string,name:string,gender:string){
        this.id=id;
        this.urlImage=urlImage;
        this.name=name;
        this.gender=gender;
    }
}